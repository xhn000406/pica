import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { defaultLayoutId, getStripLayout } from './data/layouts'
import { getMockPhotos } from './data/mockPhotos'
import { CameraPage } from './pages/CameraPage'
import { EditPage } from './pages/EditPage'
import { ExportPage } from './pages/ExportPage'
import { StartPage } from './pages/StartPage'
import { useI18n } from './useI18n'
import type {
  AppPage,
  CameraFilterId,
  FilterId,
  LayoutId,
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
} from './types'

function App() {
  const { locale, t } = useI18n()
  const shellRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)
  const countdownTimerRef = useRef<number | null>(null)
  const flashTimerRef = useRef<number | null>(null)
  const captureTimerRef = useRef<number | null>(null)
  const stageRefs = useRef<Record<AppPage, HTMLElement | null>>({
    start: null,
    camera: null,
    edit: null,
    export: null,
  })

  const [layoutId, setLayoutId] = useState<LayoutId>(defaultLayoutId)
  const [capturedPhotos, setCapturedPhotos] = useState<MockPhoto[]>([])
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const [isCaptureLocked, setIsCaptureLocked] = useState(false)
  const [filterId, setFilterId] = useState<FilterId>('original')
  const [cameraFilterId, setCameraFilterId] = useState<CameraFilterId>('original')
  const [polaroidPaperId, setPolaroidPaperId] = useState<PolaroidPaperId>('white')
  const [polaroidFooterText, setPolaroidFooterText] = useState('')
  const polaroidBackdropId: PolaroidBackdropId = 'none'
  const polaroidFrameId: PolaroidFrameId = 'none'
  const [downloadState, setDownloadState] = useState<'idle' | 'success'>('idle')

  const layout = getStripLayout(layoutId)
  const totalShots = layout.shotCount
  const mockPhotos = getMockPhotos(locale)
  const livePreviewPhoto =
    mockPhotos[capturedPhotos.length % mockPhotos.length]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.64,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        window.clearInterval(countdownTimerRef.current)
      }

      if (flashTimerRef.current) {
        window.clearTimeout(flashTimerRef.current)
      }

      if (captureTimerRef.current) {
        window.clearTimeout(captureTimerRef.current)
      }
    }
  }, [])

  const scrollToStage = (nextPage: AppPage) => {
    window.requestAnimationFrame(() => {
      stageRefs.current[nextPage]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const continueToEdit = () => {
    if (capturedPhotos.length !== totalShots) {
      return
    }
    scrollToStage('edit')
  }

  const clearCaptureTimers = () => {
    if (countdownTimerRef.current) {
      window.clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }

    if (flashTimerRef.current) {
      window.clearTimeout(flashTimerRef.current)
      flashTimerRef.current = null
    }

    if (captureTimerRef.current) {
      window.clearTimeout(captureTimerRef.current)
      captureTimerRef.current = null
    }
  }

  const resetSession = (nextPage: AppPage = 'camera') => {
    clearCaptureTimers()
    setCapturedPhotos([])
    setCountdown(null)
    setIsFlashing(false)
    setIsCaptureLocked(false)
    setDownloadState('idle')
    setCameraFilterId('original')
    setPolaroidFooterText('')
    scrollToStage(nextPage)
  }

  const handleLayoutChange = (nextLayoutId: LayoutId) => {
    if (capturedPhotos.length > 0 || isCaptureLocked) {
      return
    }
    setLayoutId(nextLayoutId)
  }

  const handleCapture = (captureFrame: () => string | null) => {
    if (isCaptureLocked || capturedPhotos.length >= totalShots) {
      return
    }

    clearCaptureTimers()
    setIsCaptureLocked(true)
    setCountdown(3)

    let nextTick = 3

    countdownTimerRef.current = window.setInterval(() => {
      nextTick -= 1

      if (nextTick > 0) {
        setCountdown(nextTick)
        return
      }

      clearCaptureTimers()
      setCountdown(null)
      const capturedSrc = captureFrame()

      if (!capturedSrc) {
        setIsCaptureLocked(false)
        return
      }

      setIsFlashing(true)
      setCapturedPhotos((previous) => {
        const shotNumber = previous.length + 1

        return [
          ...previous,
          {
            id: `camera-shot-${Date.now()}-${shotNumber}`,
            title: t('camera.capturedTitle', { count: shotNumber }),
            caption: t('camera.capturedCaption'),
            src: capturedSrc,
            accent: '#0f9d8a',
          },
        ]
      })

      flashTimerRef.current = window.setTimeout(() => {
        setIsFlashing(false)
      }, 260)

      captureTimerRef.current = window.setTimeout(() => {
        setIsCaptureLocked(false)
      }, 360)
    }, 760)
  }

  const handleMockDownload = () => {
    setDownloadState('success')
  }

  return (
    <div
      ref={shellRef}
      className="min-h-screen bg-[#fffaf7] text-[#161316] selection:bg-[#ffdce7]"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col px-4 sm:px-6 lg:px-8">
        <main ref={pageRef} className="flex-1 pb-7 lg:pb-10">
          <div className="relative space-y-20 lg:space-y-28">
            <section ref={(node) => { stageRefs.current.start = node }} data-stage="start" className="scroll-mt-32">
              <StartPage onStart={() => resetSession('camera')} />
            </section>
            <section ref={(node) => { stageRefs.current.camera = node }} data-stage="camera" className="scroll-mt-32">
              <CameraPage
                layoutId={layoutId}
                capturedPhotos={capturedPhotos}
                livePreviewPhoto={livePreviewPhoto}
                filterId={filterId}
                cameraFilterId={cameraFilterId}
                countdown={countdown}
                isFlashing={isFlashing}
                isCaptureLocked={isCaptureLocked}
                onLayoutChange={handleLayoutChange}
                onCameraFilterChange={setCameraFilterId}
                onCapture={handleCapture}
                onRestart={() => resetSession('camera')}
                onContinue={continueToEdit}
              />
            </section>
            <section ref={(node) => { stageRefs.current.edit = node }} data-stage="edit" className="scroll-mt-32">
              {capturedPhotos.length === totalShots ? (
                <EditPage
                  photos={capturedPhotos}
                  layoutId={layoutId}
                  filterId={filterId}
                  paperId={polaroidPaperId}
                  backdropId={polaroidBackdropId}
                  frameId={polaroidFrameId}
                  footerText={polaroidFooterText}
                  onFilterChange={setFilterId}
                  onPaperChange={setPolaroidPaperId}
                  onFooterTextChange={setPolaroidFooterText}
                  onBack={() => scrollToStage('camera')}
                  onContinue={() => scrollToStage('export')}
                />
              ) : <StageGate index="03" title={t('edit.polaroidTitle')} description={t('flow.lockedStage')} />}
            </section>
            <section ref={(node) => { stageRefs.current.export = node }} data-stage="export" className="scroll-mt-32">
              {capturedPhotos.length === totalShots ? (
                <ExportPage
                  photos={capturedPhotos}
                  layoutId={layoutId}
                  filterId={filterId}
                  paperId={polaroidPaperId}
                  backdropId={polaroidBackdropId}
                  frameId={polaroidFrameId}
                  footerText={polaroidFooterText}
                  downloadState={downloadState}
                  onDownload={handleMockDownload}
                  onRetake={() => resetSession('camera')}
                />
              ) : <StageGate index="04" title={t('export.title')} description={t('flow.lockedStage')} />}
            </section>
          </div>
        </main>

        <footer className="pb-8 pt-2">
          <div className="flex items-center justify-between border-t border-[#f0ded7] px-1 pt-5 text-xs uppercase tracking-[0.22em] text-[#a4888c]">
            <p>{t('app.footerGuardrails')}</p>
          </div>
        </footer>
      </div>

    </div>
  )
}

function StageGate({ index, title, description }: { index: string; title: string; description: string }) {
  return (
    <div className="grid min-h-[360px] place-items-center rounded-[34px] border border-dashed border-[#ead8d1] bg-white/54 p-8 text-center">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c07b91]">{index}</p>
        <h2 className="mt-3 font-heading text-4xl text-[#161316]">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-[#8a7477]">{description}</p>
      </div>
    </div>
  )
}

export default App
