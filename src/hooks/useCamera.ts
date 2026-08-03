import { useCallback, useEffect, useRef, useState } from 'react'

export type CameraStatus =
  | 'idle'
  | 'requesting'
  | 'ready'
  | 'denied'
  | 'unavailable'
  | 'busy'
  | 'insecure'
  | 'error'

export type CameraPlatform = 'ios' | 'android' | 'mac' | 'windows' | 'other'

type FacingMode = 'user' | 'environment'
const defaultPhotoAspectRatio = 4 / 4.65

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}

function getErrorStatus(error: unknown): CameraStatus {
  if (!(error instanceof DOMException)) {
    return 'error'
  }

  switch (error.name) {
    case 'NotAllowedError':
    case 'PermissionDeniedError':
      return window.isSecureContext ? 'denied' : 'insecure'
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return 'unavailable'
    case 'NotReadableError':
    case 'TrackStartError':
      return 'busy'
    case 'SecurityError':
      return 'insecure'
    default:
      return 'error'
  }
}

export function detectCameraPlatform(): CameraPlatform {
  const userAgent = navigator.userAgent
  const isTouchMac = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1

  if (/iPad|iPhone|iPod/.test(userAgent) || isTouchMac) {
    return 'ios'
  }

  if (/Android/i.test(userAgent)) {
    return 'android'
  }

  if (/Macintosh|Mac OS X/i.test(userAgent)) {
    return 'mac'
  }

  if (/Windows/i.test(userAgent)) {
    return 'windows'
  }

  return 'other'
}

export function useCamera(photoAspectRatio = defaultPhotoAspectRatio) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const requestIdRef = useRef(0)
  const aspectRatioRef = useRef(photoAspectRatio)
  const [status, setStatus] = useState<CameraStatus>('idle')
  const [facingMode, setFacingMode] = useState<FacingMode>('user')
  const [canSwitchCamera, setCanSwitchCamera] = useState(false)
  const [permissionState, setPermissionState] = useState<PermissionState | 'unknown'>(
    'unknown',
  )

  useEffect(() => {
    aspectRatioRef.current = photoAspectRatio
  }, [photoAspectRatio])

  const refreshVideoInputs = useCallback(async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      setCanSwitchCamera(false)
      return
    }

    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      setCanSwitchCamera(devices.filter((device) => device.kind === 'videoinput').length > 1)
    } catch {
      setCanSwitchCamera(false)
    }
  }, [])

  const stopCamera = useCallback(() => {
    requestIdRef.current += 1
    stopStream(streamRef.current)
    streamRef.current = null

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
  }, [])

  const startCamera = useCallback(
    async (nextFacingMode: FacingMode = facingMode) => {
      if (!window.isSecureContext) {
        setStatus('insecure')
        return
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setStatus('unavailable')
        return
      }

      const requestId = requestIdRef.current + 1
      requestIdRef.current = requestId
      setStatus('requesting')
      stopStream(streamRef.current)
      streamRef.current = null

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: nextFacingMode },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            aspectRatio: { ideal: aspectRatioRef.current },
          },
        })

        if (requestId !== requestIdRef.current) {
          stopStream(stream)
          return
        }

        streamRef.current = stream
        const video = videoRef.current

        if (!video) {
          stopStream(stream)
          streamRef.current = null
          setStatus('error')
          return
        }

        video.srcObject = stream
        await video.play()

        const activeFacingMode = stream.getVideoTracks()[0]?.getSettings().facingMode
        setFacingMode(activeFacingMode === 'environment' ? 'environment' : nextFacingMode)
        setPermissionState('granted')
        setStatus('ready')
        await refreshVideoInputs()

        stream.getVideoTracks()[0]?.addEventListener(
          'ended',
          () => {
            if (requestId === requestIdRef.current) {
              setStatus('error')
            }
          },
          { once: true },
        )
      } catch (error) {
        if (requestId === requestIdRef.current) {
          const nextStatus = getErrorStatus(error)
          setStatus(nextStatus)
          if (nextStatus === 'denied') {
            setPermissionState('denied')
          }
        }
      }
    },
    [facingMode, refreshVideoInputs],
  )

  const switchCamera = useCallback(async () => {
    const nextFacingMode = facingMode === 'user' ? 'environment' : 'user'
    await startCamera(nextFacingMode)
  }, [facingMode, startCamera])

  const captureFrame = useCallback(() => {
    const video = videoRef.current
    const targetAspect = aspectRatioRef.current

    if (status !== 'ready' || !video || !video.videoWidth || !video.videoHeight) {
      return null
    }

    const sourceAspectRatio = video.videoWidth / video.videoHeight
    const sourceWidth =
      sourceAspectRatio > targetAspect
        ? video.videoHeight * targetAspect
        : video.videoWidth
    const sourceHeight =
      sourceAspectRatio > targetAspect
        ? video.videoHeight
        : video.videoWidth / targetAspect
    const sourceX = (video.videoWidth - sourceWidth) / 2
    const sourceY = (video.videoHeight - sourceHeight) / 2
    const maxHeight = 1600
    const scale = Math.min(1, maxHeight / sourceHeight)
    const width = Math.round(sourceWidth * scale)
    const height = Math.round(sourceHeight * scale)
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    if (!context) {
      return null
    }

    canvas.width = width
    canvas.height = height

    if (facingMode === 'user') {
      context.translate(width, 0)
      context.scale(-1, 1)
    }

    context.drawImage(video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height)
    return canvas.toDataURL('image/jpeg', 0.92)
  }, [facingMode, status])

  useEffect(() => {
    let permissionStatus: PermissionStatus | null = null

    const readPermission = async () => {
      if (!navigator.permissions?.query) {
        return
      }

      try {
        permissionStatus = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        })
        setPermissionState(permissionStatus.state)
        permissionStatus.addEventListener('change', () => {
          if (permissionStatus) {
            setPermissionState(permissionStatus.state)
          }
        })
      } catch {
        setPermissionState('unknown')
      }
    }

    void readPermission()
    navigator.mediaDevices?.addEventListener?.('devicechange', refreshVideoInputs)

    return () => {
      navigator.mediaDevices?.removeEventListener?.('devicechange', refreshVideoInputs)
      stopCamera()
    }
  }, [refreshVideoInputs, stopCamera])

  return {
    videoRef,
    status,
    permissionState,
    facingMode,
    canSwitchCamera,
    startCamera,
    stopCamera,
    switchCamera,
    captureFrame,
  }
}
