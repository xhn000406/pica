import type { RefObject } from 'react'

import type {
  FilterId,
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
} from '../types'
import { useI18n } from '../useI18n'

type PolaroidPreviewProps = {
  photos: MockPhoto[]
  filterId: FilterId
  paperId: PolaroidPaperId
  backdropId: PolaroidBackdropId
  frameId: PolaroidFrameId
  footerText?: string
  compact?: boolean
  exportRef?: RefObject<HTMLDivElement | null>
}

const filterStyles: Record<FilterId, string> = {
  original: 'none',
  mono: 'grayscale(1) contrast(1.03)',
  'sun-kiss': 'sepia(0.2) saturate(1.16) brightness(1.04)',
  'cool-pop': 'hue-rotate(188deg) saturate(0.94) contrast(1.04)',
}

const paperStyles: Record<
  PolaroidPaperId,
  { background: string; foreground: string; muted: string; shadow: string }
> = {
  white: {
    background: '#ffffff',
    foreground: '#161316',
    muted: '#9a8281',
    shadow: '0 34px 90px rgba(120,86,68,0.18)',
  },
  cream: {
    background: '#fff7e7',
    foreground: '#2a2019',
    muted: '#9b7a68',
    shadow: '0 34px 90px rgba(126,92,50,0.18)',
  },
  pink: {
    background: '#ffe4ed',
    foreground: '#4a2531',
    muted: '#9e6576',
    shadow: '0 34px 90px rgba(158,91,111,0.18)',
  },
  blue: {
    background: '#dff4ff',
    foreground: '#1f4251',
    muted: '#5f8190',
    shadow: '0 34px 90px rgba(81,123,143,0.16)',
  },
  black: {
    background: '#161316',
    foreground: '#fffaf7',
    muted: '#cbbfc2',
    shadow: '0 34px 90px rgba(22,19,22,0.28)',
  },
}

const backdropStyles: Record<PolaroidBackdropId, string> = {
  none: 'bg-transparent',
  'pink-grid':
    'bg-[linear-gradient(#f6ccd8_1px,transparent_1px),linear-gradient(90deg,#f6ccd8_1px,transparent_1px)] bg-[size:24px_24px]',
  blue: 'bg-[#dff4ff]',
  'cream-paper': 'bg-[radial-gradient(circle_at_top,#fffdf8_0%,#fff2d7_100%)]',
}

const frameStyles: Record<
  PolaroidFrameId,
  { photoBorder: string; padding: string; radius: string }
> = {
  white: {
    photoBorder: 'border-[10px] border-white',
    padding: 'p-2',
    radius: 'rounded-[18px]',
  },
  black: {
    photoBorder: 'border-[10px] border-[#161316]',
    padding: 'p-2',
    radius: 'rounded-[18px]',
  },
  none: {
    photoBorder: 'border-0',
    padding: 'p-0',
    radius: 'rounded-[14px]',
  },
  'soft-white': {
    photoBorder: 'border-[14px] border-white',
    padding: 'p-1',
    radius: 'rounded-[24px]',
  },
}

export function PolaroidPreview({
  photos,
  filterId,
  paperId,
  backdropId,
  frameId,
  footerText = '',
  compact = false,
  exportRef,
}: PolaroidPreviewProps) {
  const { t } = useI18n()
  const paper = paperStyles[paperId]
  const frame = frameStyles[frameId]
  const frames = Array.from({ length: 4 }, (_, index) => photos[index])

  return (
    <div
      ref={exportRef}
      className={`mx-auto w-full ${compact ? 'max-w-[230px]' : 'max-w-[292px]'}`}
      style={{ color: paper.foreground }}
    >
      <div className={`rounded-[30px] p-3 ${backdropStyles[backdropId]}`}>
        <div
          className={`rounded-[26px] border border-black/5 ${
            compact ? 'p-3' : 'p-4'
          }`}
          style={{
            backgroundColor: paper.background,
            boxShadow: paper.shadow,
          }}
        >
          <div className={`${frame.padding} ${frame.photoBorder} ${frame.radius} bg-white/70`}>
            <div
              className={`space-y-3 overflow-hidden ${
                frameId === 'none' ? 'rounded-[14px]' : 'rounded-[12px]'
              }`}
              style={{ backgroundColor: paper.background }}
            >
              {frames.map((photo, index) => (
                <article
                  key={photo?.id ?? `polaroid-slot-${index}`}
                  className={`relative overflow-hidden rounded-[10px] ${
                    compact ? 'aspect-[4/4.85]' : 'aspect-[4/4.65]'
                  }`}
                  style={{ backgroundColor: paper.background }}
                >
                  {photo?.src ? (
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="h-full w-full object-cover"
                      style={{ filter: filterStyles[filterId] }}
                    />
                  ) : (
                    <div className="grid h-full place-items-center bg-[#f5ebe4] text-center text-[#a4888c]">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.24em]">
                        {t('polaroid.openSlot')} 0{index + 1}
                      </span>
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>

          {footerText.trim() ? (
            <p
              className={`${compact ? 'mt-2 text-xs' : 'mt-3 text-sm'} px-1 text-center font-semibold tracking-[0.08em]`}
              style={{ color: paper.muted }}
            >
              {footerText.trim()}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
