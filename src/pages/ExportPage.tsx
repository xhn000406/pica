import { Download, RotateCcw } from 'lucide-react'

import { LottieSlot } from '../components/LottieSlot'
import { PhotoStripPreview } from '../components/PhotoStripPreview'
import type {
  BorderToneId,
  FilterId,
  MockPhoto,
  StickerId,
} from '../types'
import { useI18n } from '../useI18n'

type ExportPageProps = {
  photos: MockPhoto[]
  borderTone: BorderToneId
  filterId: FilterId
  stickerIds: StickerId[]
  downloadState: 'idle' | 'success'
  onDownload: () => void
  onRetake: () => void
}

export function ExportPage({
  photos,
  borderTone,
  filterId,
  stickerIds,
  downloadState,
  onDownload,
  onRetake,
}: ExportPageProps) {
  const { t } = useI18n()

  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <section data-reveal className="space-y-6">
        <div className="rounded-[34px] border border-[#e7ebf0] bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f9d8a]">
            {t('export.pageLabel')}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#0b0f19] sm:text-5xl">
            {t('export.title')}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#667085]">{t('export.description')}</p>
        </div>

        <div className="rounded-[34px] border border-[#e7ebf0] bg-[#fbfcfd] p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-2xl font-semibold tracking-[-0.04em] text-[#0b0f19]">
                {t('export.finalStrip')}
              </p>
              <p className="mt-1 text-sm text-[#667085]">{t('export.finalStripSubtitle')}</p>
            </div>
            <div
              className={`rounded-full px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] ${
                downloadState === 'success'
                  ? 'bg-[#e6fff0] text-[#39845c]'
                  : 'border border-[#e7ebf0] bg-white text-[#667085]'
              }`}
            >
              {downloadState === 'success'
                ? t('export.savedMock')
                : t('export.waiting')}
            </div>
          </div>

          <PhotoStripPreview
            photos={photos}
            borderTone={borderTone}
            filterId={filterId}
            stickerIds={stickerIds}
          />
        </div>
      </section>

      <aside data-reveal className="space-y-6">
        <LottieSlot />

        <div className="rounded-[34px] border border-[#e7ebf0] bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f9d8a]">
            {t('export.exportActions')}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#667085]">
            {t('export.exportActionsDescription')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-3 rounded-2xl bg-[#0f9d8a] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b8a79]"
            >
              <Download size={18} />
              {t('export.downloadMock')}
            </button>

            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-3 rounded-2xl border border-[#e7ebf0] bg-white px-6 py-4 text-sm font-semibold text-[#475467] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f9fafb]"
            >
              <RotateCcw size={18} />
              {t('export.retake')}
            </button>
          </div>

          {downloadState === 'success' ? (
            <div className="mt-6 rounded-[24px] border border-[#d5f5e1] bg-[#f2fff7] px-4 py-4 text-sm leading-7 text-[#407657]">
              {t('export.successMessage')}
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  )
}
