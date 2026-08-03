import type { CameraFilterId } from '../types'

export type CameraFilterPreset = {
  id: CameraFilterId
  label: string
  shortLabel: string
  swatch: string
  liveFilter: string
  captureFilter: string
  overlayClass: string
  canvas: {
    saturation: number
    contrast: number
    brightness: number
    tint: string
    tintOpacity: number
    grain: number
    vignette: number
    bloom: number
  }
}

export const cameraFilterOrder: CameraFilterId[] = [
  'original',
  'ccd-blue',
  'flash-2000',
  'film-35',
  'night-chrome',
]

export const cameraFilters: Record<CameraFilterId, CameraFilterPreset> = {
  original: {
    id: 'original',
    label: 'Original',
    shortLabel: 'ORIG',
    swatch: 'linear-gradient(135deg, #ffffff, #dfe5ee)',
    liveFilter: 'none',
    captureFilter: 'none',
    overlayClass: 'bg-transparent',
    canvas: {
      saturation: 1,
      contrast: 1,
      brightness: 1,
      tint: '#ffffff',
      tintOpacity: 0,
      grain: 0,
      vignette: 0,
      bloom: 0,
    },
  },
  'ccd-blue': {
    id: 'ccd-blue',
    label: 'CCD Blue',
    shortLabel: 'CCD',
    swatch: 'linear-gradient(135deg, #a6f0ff, #317ca8)',
    liveFilter: 'saturate(1.26) contrast(1.12) brightness(1.04) hue-rotate(164deg)',
    captureFilter: 'saturate(1.26) contrast(1.12) brightness(1.04) hue-rotate(164deg)',
    overlayClass: 'bg-[#65d9ff]/18 mix-blend-color',
    canvas: {
      saturation: 1.26,
      contrast: 1.12,
      brightness: 1.04,
      tint: '#65d9ff',
      tintOpacity: 0.18,
      grain: 0.07,
      vignette: 0.08,
      bloom: 0.1,
    },
  },
  'flash-2000': {
    id: 'flash-2000',
    label: 'Flash 2000',
    shortLabel: '2000',
    swatch: 'linear-gradient(135deg, #ffe0a8, #e9776c)',
    liveFilter: 'sepia(0.22) saturate(1.34) contrast(1.1) brightness(1.08)',
    captureFilter: 'sepia(0.22) saturate(1.34) contrast(1.1) brightness(1.08)',
    overlayClass: 'bg-[#ffbd72]/16 mix-blend-soft-light',
    canvas: {
      saturation: 1.34,
      contrast: 1.1,
      brightness: 1.08,
      tint: '#ffbd72',
      tintOpacity: 0.16,
      grain: 0.045,
      vignette: 0.22,
      bloom: 0.24,
    },
  },
  'film-35': {
    id: 'film-35',
    label: 'Film 35',
    shortLabel: '35MM',
    swatch: 'linear-gradient(135deg, #e3bd7b, #9b6956)',
    liveFilter: 'sepia(0.34) saturate(0.84) contrast(0.9) brightness(1.08)',
    captureFilter: 'sepia(0.34) saturate(0.84) contrast(0.9) brightness(1.08)',
    overlayClass: 'bg-[#f6c784]/12 mix-blend-screen',
    canvas: {
      saturation: 0.84,
      contrast: 0.9,
      brightness: 1.08,
      tint: '#f6c784',
      tintOpacity: 0.12,
      grain: 0.12,
      vignette: 0.13,
      bloom: 0.18,
    },
  },
  'night-chrome': {
    id: 'night-chrome',
    label: 'Night Chrome',
    shortLabel: 'NIGHT',
    swatch: 'linear-gradient(135deg, #637a9c, #151b31)',
    liveFilter: 'saturate(0.88) contrast(1.34) brightness(0.82) hue-rotate(184deg)',
    captureFilter: 'saturate(0.88) contrast(1.34) brightness(0.82) hue-rotate(184deg)',
    overlayClass: 'bg-[#314a98]/22 mix-blend-color',
    canvas: {
      saturation: 0.88,
      contrast: 1.34,
      brightness: 0.82,
      tint: '#314a98',
      tintOpacity: 0.22,
      grain: 0.09,
      vignette: 0.3,
      bloom: 0.08,
    },
  },
}

export function getCameraFilter(id: CameraFilterId) {
  return cameraFilters[id]
}
