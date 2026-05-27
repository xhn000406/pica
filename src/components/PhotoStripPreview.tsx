import type { BorderToneId, FilterId, MockPhoto, StickerId } from '../types'
import { useI18n } from '../useI18n'

type PhotoStripPreviewProps = {
  photos: MockPhoto[]
  borderTone: BorderToneId
  filterId: FilterId
  stickerIds: StickerId[]
  compact?: boolean
  withPlaceholders?: boolean
}

const borderStyles: Record<
  BorderToneId,
  { shell: string; panel: string; badge: string }
> = {
  butter: {
    shell: '#fff7df',
    panel: '#fffef7',
    badge: '#f3b758',
  },
  blush: {
    shell: '#ffe8ef',
    panel: '#fff9fb',
    badge: '#ec7d9d',
  },
  mint: {
    shell: '#e2fff1',
    panel: '#f9fffb',
    badge: '#4db88a',
  },
  midnight: {
    shell: '#292733',
    panel: '#393747',
    badge: '#f6d782',
  },
}

const filterStyles: Record<FilterId, string> = {
  original: 'none',
  mono: 'grayscale(1) contrast(1.03)',
  'sun-kiss': 'sepia(0.18) saturate(1.2) brightness(1.04)',
  'cool-pop': 'hue-rotate(188deg) saturate(0.96) contrast(1.04)',
}

const stickerLayouts: Record<
  StickerId,
  { label: string; className: string; style: React.CSSProperties }
> = {
  spark: {
    label: 'spark',
    className: 'bg-[#fff2b8] text-[#6d4f1f]',
    style: { top: '18%', right: '-12px', transform: 'rotate(10deg)' },
  },
  bestie: {
    label: 'bestie',
    className: 'bg-[#ffc3db] text-[#7e2f55]',
    style: { top: '42%', left: '-12px', transform: 'rotate(-8deg)' },
  },
  date: {
    label: '05.27',
    className: 'bg-[#dff7ff] text-[#21586a]',
    style: { bottom: '20%', right: '-10px', transform: 'rotate(8deg)' },
  },
  flash: {
    label: 'flash',
    className: 'bg-[#d8ffe4] text-[#27633b]',
    style: { bottom: '8%', left: '-10px', transform: 'rotate(-6deg)' },
  },
}

export function PhotoStripPreview({
  photos,
  borderTone,
  filterId,
  stickerIds,
  compact = false,
  withPlaceholders = false,
}: PhotoStripPreviewProps) {
  const { t } = useI18n()
  const tone = borderStyles[borderTone]
  const frameList = [...photos]

  while (withPlaceholders && frameList.length < 4) {
    frameList.push({
      id: `placeholder-${frameList.length}`,
      title: t('strip.openSlot'),
      caption: t('strip.waitingShot'),
      src: '',
      accent: '#b9ad9e',
    })
  }

  const stickerLabels: Record<StickerId, string> = {
    spark: t('strip.stickerSpark'),
    bestie: t('strip.stickerBestie'),
    date: '05.27',
    flash: t('strip.stickerFlash'),
  }

  return (
    <div
      className={`photo-strip relative mx-auto w-full max-w-[280px] rounded-[32px] border border-black/5 p-4 shadow-[0_26px_60px_rgba(83,63,42,0.18)] ${
        compact ? 'max-w-[220px]' : ''
      }`}
      style={{ backgroundColor: tone.shell }}
    >
      <div className="mb-3 flex items-center justify-between px-1">
        <div>
          <p className="font-heading text-lg leading-none text-[#2a2019]">
            {t('strip.title')}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#7b6a5d]">
            {t('strip.subtitle')}
          </p>
        </div>
        <span
          className="rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white"
          style={{ backgroundColor: tone.badge }}
        >
          {t('strip.ready')}
        </span>
      </div>

      <div
        className="relative space-y-3 rounded-[24px] border border-black/6 p-3"
        style={{
          backgroundColor: tone.panel,
          color: borderTone === 'midnight' ? '#fff8ef' : '#2c221a',
        }}
      >
        {frameList.map((photo, index) => {
          const isPlaceholder = !photo.src

          return (
            <article
              key={photo.id}
              className={`relative overflow-hidden rounded-[20px] border border-black/6 ${
                compact ? 'aspect-[4/4.9]' : 'aspect-[4/4.7]'
              }`}
              style={{ background: isPlaceholder ? '#f2eadf' : '#ffffff' }}
            >
              {isPlaceholder ? (
                <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_top,_#fff_0%,_#efe4d6_55%,_#ead8c2_100%)] text-center text-[#8d7c6e]">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.36em]">
                      {t('strip.openSlot')} 0{index + 1}
                    </p>
                    <p className="mt-2 text-sm font-semibold">{t('strip.waitingShot')}</p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    src={photo.src}
                    alt={photo.title}
                    className="h-full w-full object-cover"
                    style={{ filter: filterStyles[filterId] }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/48 to-transparent px-4 pb-3 pt-10 text-white">
                    <p className="font-heading text-base leading-none">{photo.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.22em] text-white/75">
                      {photo.caption}
                    </p>
                  </div>
                </>
              )}
            </article>
          )
        })}

        {stickerIds.map((stickerId) => {
          const sticker = stickerLayouts[stickerId]

          return (
            <span
              key={stickerId}
              className={`absolute rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.22em] shadow-[0_8px_18px_rgba(0,0,0,0.14)] ${sticker.className}`}
              style={sticker.style}
            >
              {stickerLabels[stickerId] ?? sticker.label}
            </span>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-[10px] uppercase tracking-[0.24em] text-[#8b7c6b]">
        <span>{t('strip.studioGlow')}</span>
        <span>{t('strip.shotsCount')}</span>
      </div>
    </div>
  )
}
