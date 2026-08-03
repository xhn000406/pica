import { Download, LoaderCircle, RotateCcw, Share2 } from 'lucide-react'
import { useState } from 'react'

import { LottieSlot } from '../components/LottieSlot'
import { PolaroidPreview } from '../components/PolaroidPreview'
import { createPolaroidPng } from '../lib/exportPolaroid'
import type {
  FilterId,
  LayoutId,
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
} from '../types'
import { useI18n } from '../useI18n'

type ExportPageProps = {
  photos: MockPhoto[]
  layoutId: LayoutId
  filterId: FilterId
  paperId: PolaroidPaperId
  backdropId: PolaroidBackdropId
  frameId: PolaroidFrameId
  footerText: string
  downloadState: 'idle' | 'success'
  onDownload: () => void
  onRetake: () => void
}

export function ExportPage({
  photos,
  layoutId,
  filterId,
  paperId,
  backdropId,
  frameId,
  footerText,
  downloadState,
  onDownload,
  onRetake,
}: ExportPageProps) {
  const { t } = useI18n()
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState(false)

  const handleExport = async () => {
    if (isExporting) return

    setIsExporting(true)
    setExportError(false)

    try {
      const blob = await createPolaroidPng({
        photos,
        filterId,
        paperId,
        backdropId,
        frameId,
        footerText,
        layoutId,
      })
      const file = new File([blob], 'pica-booth-photo-strip.png', { type: 'image/png' })
      const prefersShare = window.matchMedia('(pointer: coarse)').matches
      const canShareFile =
        prefersShare &&
        typeof navigator.share === 'function' &&
        (!navigator.canShare || navigator.canShare({ files: [file] }))

      if (canShareFile) {
        await navigator.share({ files: [file], title: 'Pica Booth' })
      } else {
        const link = document.createElement('a')
        link.download = file.name
        link.href = URL.createObjectURL(file)
        link.click()
        window.setTimeout(() => URL.revokeObjectURL(link.href), 0)
      }

      onDownload()
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setExportError(true)
    } finally {
      setIsExporting(false)
    }
  }

  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches

  return (
    <div className="grid gap-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-start">
      <section data-reveal className="space-y-6">
        <div className="rounded-[30px] border border-[#ead8d1] bg-white/70 p-6 shadow-[0_20px_50px_rgba(120,86,68,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c07b91]">
            {t('export.pageLabel')}
          </p>
          <h1 className="mt-3 font-heading text-5xl leading-[0.98] text-[#161316] sm:text-6xl">
            {t('export.title')}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#8a7477]">{t('export.description')}</p>
        </div>

        <div className="rounded-[30px] border border-[#ead8d1] bg-white/62 p-6 shadow-[0_24px_60px_rgba(120,86,68,0.1)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="font-heading text-3xl text-[#161316]">
                {t('export.finalStrip')}
              </p>
              <p className="mt-1 text-sm text-[#8a7477]">{t('export.finalStripSubtitle')}</p>
            </div>
            <div
              className={`rounded-full px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] ${
                downloadState === 'success'
                  ? 'bg-[#e9fbf4] text-[#5f9479]'
                  : 'border border-[#ead8d1] bg-white/82 text-[#8f7477]'
              }`}
            >
              {downloadState === 'success'
                ? t('export.savedMock')
                : t('export.waiting')}
            </div>
          </div>

          <PolaroidPreview
            photos={photos}
            filterId={filterId}
            paperId={paperId}
            backdropId={backdropId}
            frameId={frameId}
            layoutId={layoutId}
            footerText={footerText}
          />
        </div>
      </section>

      <aside data-reveal className="space-y-6">
        <LottieSlot />

        <div className="rounded-[30px] border border-[#ead8d1] bg-white/70 p-6 shadow-[0_24px_60px_rgba(120,86,68,0.1)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#c07b91]">
            {t('export.exportActions')}
          </p>
          <p className="mt-3 text-sm leading-7 text-[#8a7477]">
            {t('export.exportActionsDescription')}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center gap-3 rounded-full bg-[#161316] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(22,19,22,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b2529] disabled:cursor-wait disabled:opacity-70"
            >
              {isExporting ? <LoaderCircle className="animate-spin" size={18} /> : isTouchDevice ? <Share2 size={18} /> : <Download size={18} />}
              {isExporting ? t('export.exporting') : isTouchDevice ? t('export.shareImage') : t('export.downloadPng')}
            </button>

            <button
              type="button"
              onClick={onRetake}
              className="inline-flex items-center gap-3 rounded-full border border-[#ead8d1] bg-white/82 px-6 py-4 text-sm font-semibold text-[#756467] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff3f6]"
            >
              <RotateCcw size={18} />
              {t('export.retake')}
            </button>
          </div>

          {downloadState === 'success' ? (
            <div className="mt-6 rounded-[22px] border border-[#dcefe4] bg-[#f6fff9] px-4 py-4 text-sm leading-7 text-[#5f9479]">
              {t('export.successMessage')}
            </div>
          ) : null}

          {exportError ? (
            <div className="mt-4 rounded-[22px] border border-[#f3d2d8] bg-[#fff4f6] px-4 py-4 text-sm leading-7 text-[#a95368]">
              {t('export.errorMessage')}
            </div>
          ) : null}
        </div>
      </aside>
    </div>
  )
}
