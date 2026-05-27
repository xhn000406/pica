import { getMessage } from '../locales'
import type { AppLocale, MockPhoto } from '../types'

const createMockPhoto = ({
  id,
  title,
  caption,
  accent,
  backgroundA,
  backgroundB,
  doodleA,
  doodleB,
}: {
  id: string
  title: string
  caption: string
  accent: string
  backgroundA: string
  backgroundB: string
  doodleA: string
  doodleB: string
}) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 720" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="${id}-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${backgroundA}" />
          <stop offset="100%" stop-color="${backgroundB}" />
        </linearGradient>
      </defs>
      <rect width="520" height="720" rx="40" fill="url(#${id}-bg)" />
      <circle cx="110" cy="110" r="74" fill="${doodleA}" fill-opacity="0.32" />
      <circle cx="420" cy="144" r="92" fill="${doodleB}" fill-opacity="0.22" />
      <circle cx="402" cy="600" r="96" fill="${doodleA}" fill-opacity="0.18" />
      <path d="M76 472c72-84 164-124 276-120 44 0 74 8 92 16v168H76Z" fill="#fff3" />
      <rect x="110" y="180" width="300" height="272" rx="148" fill="#fff5" />
      <circle cx="220" cy="292" r="24" fill="#2d2a26" />
      <circle cx="300" cy="292" r="24" fill="#2d2a26" />
      <path d="M198 362c22 30 48 44 78 44s56-14 78-44" fill="none" stroke="#2d2a26" stroke-linecap="round" stroke-width="18" />
      <rect x="92" y="520" width="336" height="112" rx="28" fill="#fff8" />
      <text x="116" y="566" fill="#2d2a26" font-size="28" font-family="Trebuchet MS, Arial, sans-serif" font-weight="700">${title}</text>
      <text x="116" y="604" fill="#51493f" font-size="22" font-family="Trebuchet MS, Arial, sans-serif">${caption}</text>
      <text x="388" y="112" fill="${accent}" font-size="22" font-family="Courier New, monospace" text-anchor="end">PICA</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

const photoSpecs = [
  {
    id: 'bubble-day',
    accent: '#ff7a59',
    backgroundA: '#ffd6c7',
    backgroundB: '#fff0cb',
    doodleA: '#ff8f70',
    doodleB: '#fff7f1',
  },
  {
    id: 'mint-loop',
    accent: '#34b38a',
    backgroundA: '#cff4e4',
    backgroundB: '#e5fff6',
    doodleA: '#5bd8ac',
    doodleB: '#ffffff',
  },
  {
    id: 'sky-pop',
    accent: '#527dff',
    backgroundA: '#dce7ff',
    backgroundB: '#f7fbff',
    doodleA: '#7298ff',
    doodleB: '#ffffff',
  },
  {
    id: 'berry-bloom',
    accent: '#d94e83',
    backgroundA: '#ffd7e8',
    backgroundB: '#fff0f6',
    doodleA: '#ff7aad',
    doodleB: '#ffffff',
  },
] as const

export function getMockPhotos(locale: AppLocale): MockPhoto[] {
  return photoSpecs.map((photo) => {
    const title = getMessage(locale, `photos.${photo.id}.title`)
    const caption = getMessage(locale, `photos.${photo.id}.caption`)

    return {
      id: photo.id,
      title,
      caption,
      accent: photo.accent,
      src: createMockPhoto({
        id: photo.id,
        title,
        caption,
        accent: photo.accent,
        backgroundA: photo.backgroundA,
        backgroundB: photo.backgroundB,
        doodleA: photo.doodleA,
        doodleB: photo.doodleB,
      }),
    }
  })
}
