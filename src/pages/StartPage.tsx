import { ArrowRight, Camera, Sparkles, Wand2 } from 'lucide-react'

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
  const titleWidthClass = locale === 'zh-CN' ? 'max-w-[13ch]' : 'max-w-[9ch]'
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
      <div className="grid min-h-[calc(100vh-190px)] gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section data-reveal className="space-y-7">
          <div className="inline-flex rounded-full border border-[#ead8d1] bg-white/76 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#9b7a7f] shadow-[0_10px_24px_rgba(120,86,68,0.06)]">
            {t('start.badge')}
          </div>

          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c07b91]">
              {t('start.eyebrow')}
            </p>
            <h1 className={`${titleWidthClass} font-heading text-6xl leading-[0.9] text-[#161316] sm:text-7xl lg:text-8xl`}>
              {t('start.title')}
            </h1>
            <p className="max-w-xl text-base leading-8 text-[#756467] sm:text-lg">
              {t('start.description')}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="button"
              onClick={onStart}
              className="inline-flex items-center gap-3 rounded-full bg-[#161316] px-6 py-4 text-base font-semibold text-white shadow-[0_18px_38px_rgba(22,19,22,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2b2529]"
            >
              {t('start.startButton')}
              <ArrowRight size={18} />
            </button>
            <div className="rounded-full border border-[#ead8d1] bg-white/82 px-5 py-4 text-sm font-semibold text-[#8f7477] shadow-[0_12px_30px_rgba(120,86,68,0.06)]">
              {t('start.metaPill')}
            </div>
          </div>

          <div className="grid max-w-2xl gap-3 sm:grid-cols-3">
            {highlights.map(({ icon: Icon, title, description }) => (
              <article
                key={title}
                data-reveal
                className="rounded-[22px] border border-[#ead8d1] bg-white/70 p-4 shadow-[0_14px_30px_rgba(120,86,68,0.05)]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe5ed] text-[#c05f7d]">
                  <Icon size={18} />
                </div>
                <h2 className="mt-3 text-sm font-semibold text-[#161316]">{title}</h2>
                <p className="mt-1 text-xs leading-5 text-[#8a7477]">{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section data-reveal className="relative">
          <div className="absolute left-8 top-10 h-48 w-48 rounded-full bg-[#ffdce7]/70 blur-3xl" />
          <div className="absolute bottom-8 right-8 h-56 w-56 rounded-full bg-[#dff4ff]/70 blur-3xl" />
          <div className="relative mx-auto max-w-[560px] rounded-[34px] border border-[#ead8d1] bg-white/62 p-6 shadow-[0_30px_80px_rgba(120,86,68,0.12)] backdrop-blur">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-3xl text-[#161316]">
                  {t('start.previewTitle')}
                </p>
                <p className="mt-1 text-sm text-[#8a7477]">{t('start.previewSubtitle')}</p>
              </div>
              <div className="rounded-full bg-[#ffe5ed] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#b65d78]">
                {t('start.stageBadge')}
              </div>
            </div>

            <div className="grid items-center gap-5 sm:grid-cols-[1fr_0.72fr]">
              <PhotoStripPreview
                photos={previewPhotos}
                borderTone={borderTone}
                filterId={filterId}
                stickerIds={stickerIds}
                compact={false}
              />

              <div className="space-y-3 text-sm text-[#756467]">
                <div className="rounded-2xl border border-[#f0ded7] bg-[#fffaf7] px-4 py-3">
                  <p className="font-semibold text-[#161316]">4 cut strip</p>
                  <p className="mt-1 text-xs leading-5">Soft frame, real camera, local only.</p>
                </div>
                <div className="rounded-2xl border border-[#f0ded7] bg-[#fff7fb] px-4 py-3">
                  <p className="font-semibold text-[#161316]">K-style booth</p>
                  <p className="mt-1 text-xs leading-5">Clean, cute, made for sharing.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
