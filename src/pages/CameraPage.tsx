import {
  AlertCircle,
  Camera,
  X,
  LoaderCircle,
  RefreshCw,
  RotateCcw,
  ShieldCheck,
  SwitchCamera,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { LayoutPicker } from '../components/LayoutPicker'
import { PolaroidPreview } from '../components/PolaroidPreview'
import { getStripLayout } from '../data/layouts'
import {
  detectCameraPlatform,
  useCamera,
  type CameraStatus,
} from '../hooks/useCamera'
import type { FilterId, LayoutId, MockPhoto } from '../types'
import { useI18n } from '../useI18n'

type CameraPageProps = {
  layoutId: LayoutId
  capturedPhotos: MockPhoto[]
  livePreviewPhoto: MockPhoto
  filterId: FilterId
  countdown: number | null
  isFlashing: boolean
  isCaptureLocked: boolean
  onLayoutChange: (layoutId: LayoutId) => void
  onCapture: (captureFrame: () => string | null) => void
  onRestart: () => void
  onContinue: () => void
}

const cameraErrorMessageKeys: Partial<Record<CameraStatus, string>> = {
  denied: 'camera.permissionDenied',
  unavailable: 'camera.cameraUnavailable',
  busy: 'camera.cameraBusy',
  insecure: 'camera.insecureContext',
  error: 'camera.cameraError',
}

function viewfinderAspectClass(photoAspect: number) {
  if (Math.abs(photoAspect - 1) < 0.02) return 'aspect-square'
  if (Math.abs(photoAspect - 4 / 3) < 0.02) return 'aspect-[4/3]'
  if (Math.abs(photoAspect - 3 / 4) < 0.02) return 'aspect-[3/4]'
  return 'aspect-[4/4.65]'
}

export function CameraPage({
  layoutId,
  capturedPhotos,
  livePreviewPhoto,
  filterId,
  countdown,
  isFlashing,
  isCaptureLocked,
  onLayoutChange,
  onCapture,
  onRestart,
  onContinue,
}: CameraPageProps) {
  const { t } = useI18n()
  const layout = getStripLayout(layoutId)
  const {
    videoRef,
    status,
    permissionState,
    facingMode,
    canSwitchCamera,
    startCamera,
    switchCamera,
    captureFrame,
  } = useCamera(layout.photoAspect)
  const shotCount = capturedPhotos.length
  const totalShots = layout.shotCount
  const isSessionComplete = shotCount === totalShots
  const hasCaptures = shotCount > 0
  const displayStatus =
    status === 'idle' && permissionState === 'denied' ? 'denied' : status
  const errorMessageKey = cameraErrorMessageKeys[displayStatus]
  const platform = detectCameraPlatform()
  const isCameraReady = status === 'ready'
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    if (!isPreviewOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPreviewOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPreviewOpen])

  return (
    <div className="space-y-8">
      <div data-reveal>
        <LayoutPicker
          selectedId={layoutId}
          disabled={hasCaptures || isCaptureLocked}
          onSelect={onLayoutChange}
        />
        {hasCaptures ? (
          <p className="mt-3 text-sm text-[#8a7477]">{t('layout.lockedHint')}</p>
        ) : null}
      </div>

    <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(300px,360px)] xl:gap-12">
      <section data-reveal className="mx-auto w-full max-w-[860px] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c07b91]">
              {t('camera.pageLabel')}
            </p>
            <h1 className="mt-3 max-w-2xl font-heading text-5xl leading-[0.98] text-[#161316] sm:text-6xl">
              {t('camera.title')}
            </h1>
          </div>

          <div className="rounded-full border border-[#ead8d1] bg-white/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#8f7477] shadow-[0_10px_24px_rgba(120,86,68,0.06)]">
            {t('camera.shotCount', { count: shotCount, total: totalShots })}
          </div>
        </div>

        <div className="mx-auto max-w-[620px] rounded-[30px] border border-[#ead8d1] bg-white/78 p-3 shadow-[0_28px_70px_rgba(120,86,68,0.12)] sm:p-4">
          <div
            className={`relative mx-auto w-full max-w-[584px] overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_top,_#fff5f8_0%,_#ffdce7_34%,_#b9dff0_100%)] ${viewfinderAspectClass(layout.photoAspect)}`}
          >
            <img
              src={livePreviewPhoto.src}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-screen transition-opacity ${
                isCameraReady ? 'opacity-0' : ''
              }`}
            />
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              aria-label={t('camera.livePreview')}
              className={`h-full w-full object-cover transition-opacity ${
                facingMode === 'user' ? '-scale-x-100' : ''
              } ${isCameraReady ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(255,255,255,0.06))]" />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 px-4 py-4 text-white sm:px-5">
              <div className="rounded-full border border-white/30 bg-black/24 px-3 py-2 text-[10px] uppercase tracking-[0.22em] backdrop-blur sm:text-[11px] sm:tracking-[0.3em]">
                {isCameraReady ? t('camera.liveFeed') : t('camera.cameraFeed')}
              </div>
              {isCameraReady && canSwitchCamera ? (
                <button
                  type="button"
                  onClick={() => void switchCamera()}
                  disabled={isCaptureLocked}
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/30 bg-black/24 px-3 py-2 text-[11px] font-semibold backdrop-blur transition hover:bg-black/40 disabled:opacity-50"
                >
                  <SwitchCamera size={15} />
                  <span className="hidden sm:inline">{t('camera.switchCamera')}</span>
                </button>
              ) : (
                <div className="rounded-full border border-white/30 bg-black/24 px-3 py-2 text-[10px] uppercase tracking-[0.22em] backdrop-blur sm:text-[11px] sm:tracking-[0.3em]">
                  {t('camera.flashReady')}
                </div>
              )}
            </div>

            {isCameraReady ? (
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 px-4 py-4 text-white sm:px-5 sm:py-5">
                <div className="rounded-[18px] border border-white/18 bg-black/24 px-3 py-3 backdrop-blur sm:px-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-xs sm:tracking-[0.28em]">
                    {t('camera.currentFrame')}
                  </p>
                  <p className="mt-2 text-lg font-semibold tracking-[-0.04em] sm:text-2xl">
                    {t('camera.liveCamera')}
                  </p>
                </div>

                <div className="rounded-[18px] border border-white/18 bg-black/24 px-3 py-3 text-right backdrop-blur sm:px-4">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-white/70 sm:text-xs sm:tracking-[0.28em]">
                    {t('camera.boothMode')}
                  </p>
                  <p className="mt-2 text-sm font-semibold sm:text-lg">
                    {countdown
                      ? t('camera.captureIn', { count: countdown })
                      : t('camera.readyToSnap')}
                  </p>
                </div>
              </div>
            ) : null}

            {!isCameraReady ? (
              <div className="absolute inset-0 grid place-items-center bg-[#161316]/58 px-5 text-center text-white backdrop-blur-sm">
                <div className="max-w-md rounded-[24px] border border-white/18 bg-black/22 p-5 shadow-2xl sm:p-7">
                  {displayStatus === 'requesting' ? (
                    <LoaderCircle className="mx-auto animate-spin" size={34} />
                  ) : errorMessageKey ? (
                    <AlertCircle className="mx-auto text-[#ffd56a]" size={34} />
                  ) : (
                    <ShieldCheck className="mx-auto text-[#ffdce7]" size={34} />
                  )}
                  <p className="mt-4 text-xl font-semibold">
                    {displayStatus === 'requesting'
                      ? t('camera.requestingPermission')
                      : errorMessageKey
                        ? t(errorMessageKey)
                        : t('camera.permissionTitle')}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-white/72">
                    {errorMessageKey
                      ? t(`camera.permissionHelp.${platform}`)
                      : t('camera.permissionDescription')}
                  </p>
                  {displayStatus !== 'requesting' ? (
                    <button
                      type="button"
                      onClick={() => void startCamera()}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#161316] transition hover:-translate-y-0.5 hover:bg-[#fff1f5]"
                    >
                      {errorMessageKey ? <RefreshCw size={17} /> : <Camera size={17} />}
                      {errorMessageKey ? t('camera.retryCamera') : t('camera.enableCamera')}
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}

            {countdown ? (
              <div className="absolute inset-0 grid place-items-center bg-black/18">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/45 bg-white/18 text-5xl font-black text-white shadow-[0_0_60px_rgba(255,220,231,0.34)] backdrop-blur">
                  {countdown}
                </div>
              </div>
            ) : null}

            {isFlashing ? (
              <div className="pointer-events-none absolute inset-0 animate-[flashPulse_420ms_ease-out] bg-white/90" />
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onCapture(captureFrame)}
            disabled={!isCameraReady || isCaptureLocked || isSessionComplete}
            className="inline-flex items-center gap-3 rounded-full bg-[#161316] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(22,19,22,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b2529] disabled:cursor-not-allowed disabled:bg-[#d3c6c9]"
          >
            <Camera size={18} />
            {isSessionComplete ? t('camera.allShotsCaptured') : t('camera.takePhoto')}
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-3 rounded-full border border-[#ead8d1] bg-white/82 px-6 py-4 text-sm font-semibold text-[#756467] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff3f6]"
          >
            <RotateCcw size={18} />
            {t('camera.restart')}
          </button>

          <button
            type="button"
            onClick={onContinue}
            disabled={!isSessionComplete}
            className="inline-flex items-center gap-3 rounded-full border border-[#ffd0df] bg-[#fff1f5] px-6 py-4 text-sm font-semibold text-[#b65d78] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffe5ed] disabled:cursor-not-allowed disabled:border-[#ead8d1] disabled:bg-[#f7efed] disabled:text-[#b7a8ac]"
          >
            {t('camera.continueToEdit')}
          </button>
          <div className="ml-auto flex gap-2">
            {Array.from({ length: totalShots }, (_, index) => (
              <span
                key={index}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index < shotCount ? 'bg-[#161316]' : 'bg-[#ead8d1]'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <aside data-reveal className="mx-auto w-full max-w-[390px] space-y-5 xl:mx-0">
        <div className="rounded-[30px] border border-[#ead8d1] bg-white/70 p-5 shadow-[0_24px_60px_rgba(120,86,68,0.1)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-heading text-3xl text-[#161316]">
                {t('camera.sessionStrip')}
              </p>
              <p className="mt-1 text-sm text-[#8a7477]">{t('camera.fillSlots')}</p>
            </div>
            <button
              type="button"
              onClick={() => setIsPreviewOpen(true)}
              className="rounded-full bg-[#ffe5ed] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b65d78] transition hover:-translate-y-0.5 hover:bg-[#ffd9e7]"
            >
              {t('camera.previewBadge')}
            </button>
          </div>

          <div className="mx-auto flex w-full justify-center">
            <PolaroidPreview
              photos={capturedPhotos}
              filterId={filterId}
              paperId="white"
              backdropId="none"
              frameId="none"
              layoutId={layoutId}
              compact
            />
          </div>
        </div>

        <div className="rounded-[24px] border border-[#ead8d1] bg-white/54 p-5 text-sm shadow-[0_18px_44px_rgba(120,86,68,0.07)]">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#c07b91]">
            {t('camera.phaseNoteTitle')}
          </p>
          <p className="mt-3 leading-7 text-[#8a7477]">{t('camera.phaseNoteBody')}</p>
        </div>
      </aside>
      {isPreviewOpen ? (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-[#161316]/32 px-4 py-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={t('camera.sessionStrip')}
          onClick={() => setIsPreviewOpen(false)}
        >
          <div
            className="mx-auto w-full max-w-[460px] rounded-[34px] border border-[#ead8d1] bg-white p-6 shadow-[0_34px_100px_rgba(22,19,22,0.22)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-3xl text-[#161316]">
                  {t('camera.sessionStrip')}
                </p>
                <p className="mt-1 text-sm text-[#8a7477]">{t('camera.fillSlots')}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8d1] bg-[#fffaf7] text-[#756467] transition hover:bg-[#fff3f6]"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>
            </div>

            <PolaroidPreview
              photos={capturedPhotos}
              filterId={filterId}
              paperId="white"
              backdropId="none"
              frameId="none"
              layoutId={layoutId}
            />
          </div>
        </div>
      ) : null}
    </div>
    </div>
  )
}
