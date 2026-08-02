import type { BorderToneId, FilterId, MockPhoto, StickerId } from '../types'
import { useI18n } from '../useI18n'

type PhotoStripPreviewProps = {
  photos: MockPhoto[]
  borderTone: BorderToneId
  filterId: FilterId
  stickerIds: StickerId[]
  compact?: boolean
  sidebar?: boolean
  withPlaceholders?: boolean
}

const borderStyles: Record<
  BorderToneId,
  { shell: string; panel: string; badge: string }
> = {
  butter: {
    shell: '#fff7e7',
    panel: '#fffdf8',
    badge: '#dfad58',
  },
  blush: {
    shell: '#ffe4ed',
    panel: '#fff9fb',
    badge: '#db7891',
  },
  mint: {
    shell: '#e9fbf4',
    panel: '#fbfffd',
    badge: '#78b89a',
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
    className: 'bg-[#fff1bd] text-[#6d4f1f]',
    style: { top: '18%', right: '-12px', transform: 'rotate(10deg)' },
  },
  bestie: {
    label: 'bestie',
    className: 'bg-[#ffd0df] text-[#7e2f55]',
    style: { top: '42%', left: '-12px', transform: 'rotate(-8deg)' },
  },
  date: {
    label: '05.27',
    className: 'bg-[#dff4ff] text-[#21586a]',
    style: { bottom: '20%', right: '-10px', transform: 'rotate(8deg)' },
  },
  flash: {
    label: 'flash',
    className: 'bg-[#def9e9] text-[#27633b]',
    style: { bottom: '8%', left: '-10px', transform: 'rotate(-6deg)' },
  },
}

export function PhotoStripPreview({
  photos,
  borderTone,
  filterId,
  stickerIds,
  compact = false,
  sidebar = false,
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
  const isSmall = compact || sidebar

  return (
    <div
      className={`photo-strip relative mx-auto w-full max-w-[292px] rounded-[26px] border border-white p-4 shadow-[0_28px_70px_rgba(109,77,64,0.18)] ring-1 ring-[#ead8d1]/70 ${
        compact ? 'max-w-[230px] rounded-[22px] p-3' : ''
      } ${
        sidebar ? 'max-w-[268px] rounded-[24px] p-3 shadow-[0_24px_60px_rgba(109,77,64,0.16)]' : ''
      }`}
      style={{ backgroundColor: tone.shell }}
    >
      <div className={`${sidebar ? 'mb-2.5' : 'mb-3'} flex items-center justify-between px-1`}>
        <div>
          <p
            className={`font-heading leading-none text-[#2a2019] ${
              sidebar ? 'text-base' : 'text-lg'
            }`}
          >
            {t('strip.title')}
          </p>
          <p
            className={`mt-1 uppercase text-[#8f7477] ${
              sidebar ? 'text-[8px] tracking-[0.24em]' : 'text-[9px] tracking-[0.28em]'
            }`}
          >
            {t('strip.subtitle')}
          </p>
        </div>
        <span
          className={`rounded-full font-semibold uppercase tracking-[0.2em] text-white ${
            sidebar ? 'px-2 py-1 text-[8px]' : 'px-2.5 py-1 text-[9px]'
          }`}
          style={{ backgroundColor: tone.badge }}
        >
          {t('strip.ready')}
        </span>
      </div>

      <div
        className={`relative space-y-3 rounded-[20px] border border-black/5 p-3 ${
          compact ? 'space-y-2.5 rounded-[18px] p-2.5' : ''
        } ${
          sidebar ? 'space-y-2 rounded-[18px] p-2.5' : ''
        }`}
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
              className={`relative overflow-hidden rounded-[14px] border border-black/5 ${
                isSmall ? 'aspect-[4/4.85] rounded-[12px]' : 'aspect-[4/4.65]'
              }`}
              style={{ background: isPlaceholder ? '#f5ebe4' : '#ffffff' }}
            >
              {isPlaceholder ? (
                <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_top,_#fff_0%,_#f5ebe4_58%,_#ecd9d3_100%)] text-center text-[#9a8281]">
                  <div>
                    <p
                      className={`uppercase tracking-[0.32em] ${
                        sidebar ? 'text-[8px]' : 'text-[9px]'
                      }`}
                    >
                      {t('strip.openSlot')} 0{index + 1}
                    </p>
                    <p className={`${sidebar ? 'mt-1.5 text-[11px]' : 'mt-2 text-xs'} font-semibold`}>
                      {t('strip.waitingShot')}
                    </p>
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
                  <div
                    className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/42 to-transparent text-white ${
                      sidebar ? 'px-2.5 pb-2.5 pt-8' : 'px-3 pb-3 pt-10'
                    }`}
                  >
                    <p className={`font-heading leading-none ${sidebar ? 'text-xs' : 'text-sm'}`}>
                      {photo.title}
                    </p>
                    <p
                      className={`mt-1 uppercase tracking-[0.2em] text-white/75 ${
                        sidebar ? 'text-[8px]' : 'text-[10px]'
                      }`}
                    >
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
              className={`absolute rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] shadow-[0_8px_18px_rgba(0,0,0,0.12)] ${sticker.className}`}
              style={sticker.style}
            >
              {stickerLabels[stickerId] ?? sticker.label}
            </span>
          )
        })}
      </div>

      <div className="mt-3 flex items-center justify-between px-1 text-[9px] uppercase tracking-[0.24em] text-[#9a8281]">
        <span>{t('strip.studioGlow')}</span>
        <span>{t('strip.shotsCount')}</span>
      </div>
    </div>
  )
}
