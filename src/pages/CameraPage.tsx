import { Camera, RotateCcw } from 'lucide-react'

import { PhotoStripPreview } from '../components/PhotoStripPreview'
import type { BorderToneId, FilterId, MockPhoto, StickerId } from '../types'
import { useI18n } from '../useI18n'

type CameraPageProps = {
  capturedPhotos: MockPhoto[]
  livePreviewPhoto: MockPhoto
  borderTone: BorderToneId
  filterId: FilterId
  stickerIds: StickerId[]
  countdown: number | null
  isFlashing: boolean
  isCaptureLocked: boolean
  onCapture: () => void
  onRestart: () => void
  onContinue: () => void
}

export function CameraPage({
  capturedPhotos,
  livePreviewPhoto,
  borderTone,
  filterId,
  stickerIds,
  countdown,
  isFlashing,
  isCaptureLocked,
  onCapture,
  onRestart,
  onContinue,
}: CameraPageProps) {
  const { t } = useI18n()
  const shotCount = capturedPhotos.length
  const isSessionComplete = shotCount === 4

  return (
    <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
      <section data-reveal className="space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f9d8a]">
              {t('camera.pageLabel')}
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#0b0f19] sm:text-5xl">
              {t('camera.title')}
            </h1>
          </div>

          <div className="rounded-2xl border border-[#e7ebf0] bg-[#fbfcfd] px-4 py-2 text-sm font-semibold uppercase tracking-[0.22em] text-[#667085]">
            {t('camera.shotCount', { count: shotCount })}
          </div>
        </div>

        <div className="rounded-[32px] border border-[#e7ebf0] bg-white p-3 shadow-[0_20px_40px_rgba(15,23,42,0.06)] sm:p-5">
          <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top,_#7054b4_0%,_#402a61_40%,_#1d1626_100%)]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(255,255,255,0.06))]" />
            <img
              src={livePreviewPhoto.src}
              alt={livePreviewPhoto.title}
              className="aspect-[4/3] w-full object-cover opacity-90 mix-blend-screen"
            />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-5 py-4 text-white">
              <div className="rounded-full border border-white/20 bg-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.3em]">
                {t('camera.cameraFeed')}
              </div>
              <div className="rounded-full border border-white/20 bg-black/20 px-3 py-2 text-[11px] uppercase tracking-[0.3em]">
                {t('camera.flashReady')}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 px-5 py-5 text-white">
              <div className="rounded-[24px] border border-white/16 bg-black/18 px-4 py-3 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  {t('camera.currentFrame')}
                </p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                  {livePreviewPhoto.title}
                </p>
              </div>

              <div className="rounded-[24px] border border-white/16 bg-black/18 px-4 py-3 text-right backdrop-blur">
                <p className="text-xs uppercase tracking-[0.28em] text-white/70">
                  {t('camera.boothMode')}
                </p>
                <p className="mt-2 text-lg font-semibold">
                  {countdown
                    ? t('camera.captureIn', { count: countdown })
                    : t('camera.readyToSnap')}
                </p>
              </div>
            </div>

            {countdown ? (
              <div className="absolute inset-0 grid place-items-center bg-black/18">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/35 bg-white/15 text-5xl font-black text-white shadow-[0_0_60px_rgba(255,255,255,0.24)] backdrop-blur">
                  {countdown}
                </div>
              </div>
            ) : null}

            {isFlashing ? (
              <div className="pointer-events-none absolute inset-0 animate-[flashPulse_420ms_ease-out] bg-white/90" />
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onCapture}
            disabled={isCaptureLocked || isSessionComplete}
            className="inline-flex items-center gap-3 rounded-2xl bg-[#0f9d8a] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b8a79] disabled:cursor-not-allowed disabled:bg-[#b8dcd6]"
          >
            <Camera size={18} />
            {isSessionComplete
              ? t('camera.allShotsCaptured')
              : t('camera.takeMockShot')}
          </button>

          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-3 rounded-2xl border border-[#e7ebf0] bg-white px-6 py-4 text-sm font-semibold text-[#475467] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f9fafb]"
          >
            <RotateCcw size={18} />
            {t('camera.restart')}
          </button>

          <button
            type="button"
            onClick={onContinue}
            disabled={!isSessionComplete}
            className="inline-flex items-center gap-3 rounded-2xl border border-[#d9f3ef] bg-[#ecfffb] px-6 py-4 text-sm font-semibold text-[#0f766e] transition duration-300 hover:-translate-y-0.5 hover:bg-[#dffaf5] disabled:cursor-not-allowed disabled:bg-[#f2f4f7] disabled:text-[#98a2b3]"
          >
            {t('camera.continueToEdit')}
          </button>
        </div>
      </section>

      <aside data-reveal className="space-y-5">
        <div className="rounded-[32px] border border-[#e7ebf0] bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[#0b0f19]">
                {t('camera.sessionStrip')}
              </p>
              <p className="mt-1 text-sm text-[#667085]">{t('camera.fillSlots')}</p>
            </div>
            <span className="rounded-full bg-[#ecfffb] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f9d8a]">
              {t('camera.previewBadge')}
            </span>
          </div>

          <PhotoStripPreview
            photos={capturedPhotos}
            borderTone={borderTone}
            filterId={filterId}
            stickerIds={stickerIds}
            compact
            withPlaceholders
          />
        </div>

        <div className="rounded-[32px] border border-[#e7ebf0] bg-[#fbfcfd] p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.26em] text-[#0f9d8a]">
            {t('camera.phaseNoteTitle')}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#667085]">{t('camera.phaseNoteBody')}</p>
        </div>
      </aside>
    </div>
  )
}
