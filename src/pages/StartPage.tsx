import { ArrowRight, Camera, Sparkles, Wand2 } from 'lucide-react'

import { HeroMascotScene } from '../components/HeroMascotScene'
import { PhotoStripPreview } from '../components/PhotoStripPreview'
import type { BorderToneId, FilterId, MockPhoto, StickerId } from '../types'
import { useI18n } from '../useI18n'

type StartPageProps = {
  previewPhotos: MockPhoto[]
  borderTone: BorderToneId
  filterId: FilterId
  stickerIds: StickerId[]
  onStart: () => void
}

export function StartPage({
  previewPhotos,
  borderTone,
  filterId,
  stickerIds,
  onStart,
}: StartPageProps) {
  const { locale, t } = useI18n()
  const titleWidthClass = locale === 'zh-CN' ? 'max-w-[12ch]' : 'max-w-[8ch]'
  const highlights = [
    {
      icon: Camera,
      title: t('start.highlightOneTitle'),
      description: t('start.highlightOneDescription'),
    },
    {
      icon: Wand2,
      title: t('start.highlightTwoTitle'),
      description: t('start.highlightTwoDescription'),
    },
    {
      icon: Sparkles,
      title: t('start.highlightThreeTitle'),
      description: t('start.highlightThreeDescription'),
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-12 lg:grid-cols-[0.94fr_1.06fr] lg:items-start">
        <section data-reveal className="space-y-8">
          <div className="inline-flex rounded-full border border-[#e7ebf0] bg-[#f9fbfc] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-[#6b7280]">
            {t('start.badge')}
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#0f9d8a]">
              {t('start.eyebrow')}
            </p>
            <h1 className={`${titleWidthClass} text-5xl font-semibold leading-[0.92] tracking-[-0.06em] text-[#0b0f19] sm:text-6xl lg:text-7xl`}>
              {t('start.title')}
            </h1>
            <p className="max-w-xl text-lg leading-8 text-[#667085]">
              {t('start.description')}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-3 rounded-2xl bg-[#0f9d8a] px-6 py-4 text-base font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b8a79]"
            >
              {t('start.startButton')}
              <ArrowRight size={18} />
            </button>
            <div className="rounded-2xl border border-[#e7ebf0] bg-white px-5 py-4 text-base text-[#667085] shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
              {t('start.metaPill')}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                data-reveal
                className="rounded-[24px] border border-[#e7ebf0] bg-white p-5 shadow-[0_16px_32px_rgba(15,23,42,0.04)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ecfffb] text-[#0f9d8a]">
                  <Icon size={18} />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-[#0b0f19]">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-[#667085]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="space-y-4">
          <HeroMascotScene />

          <div className="rounded-[28px] border border-[#e7ebf0] bg-[#fbfcfd] p-5 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xl font-semibold text-[#0b0f19]">
                  {t('start.previewTitle')}
                </p>
                <p className="mt-1 text-sm text-[#667085]">{t('start.previewSubtitle')}</p>
              </div>
              <div className="rounded-full bg-[#ecfffb] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f9d8a]">
                {t('start.stageBadge')}
              </div>
            </div>

            <PhotoStripPreview
              photos={previewPhotos}
              borderTone={borderTone}
              filterId={filterId}
              stickerIds={stickerIds}
              compact={false}
            />
          </div>
        </section>
      </div>
    </div>
  )
}
