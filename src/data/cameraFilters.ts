import type { CameraFilterId } from '../types'

export type CameraFilterPreset = {
  id: CameraFilterId
  label: string
  shortLabel: string
  model: string
  cameraKind: 'phone' | 'rangefinder' | 'compact' | 'instant' | 'cine' | 'retro'
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
  'fxn',
  'grd',
  'fqs',
  'd-funs',
  'classic-u',
]

export const cameraFilters: Record<CameraFilterId, CameraFilterPreset> = {
  original: {
    id: 'original',
    label: 'Original',
    shortLabel: 'ORIG',
    model: 'NATURAL DIGITAL',
    cameraKind: 'phone',
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
  fxn: {
    id: 'fxn',
    label: 'FXN',
    shortLabel: 'FUJI',
    model: 'FUJIFILM STYLE',
    cameraKind: 'rangefinder',
    swatch: 'linear-gradient(135deg, #e4c0a7, #758b77)',
    liveFilter: 'sepia(0.12) saturate(0.9) contrast(0.92) brightness(1.06)',
    captureFilter: 'sepia(0.12) saturate(0.9) contrast(0.92) brightness(1.06)',
    overlayClass: 'bg-[#d9b79a]/10 mix-blend-color',
    canvas: {
      saturation: 0.9,
      contrast: 0.92,
      brightness: 1.06,
      tint: '#d9b79a',
      tintOpacity: 0.1,
      grain: 0.08,
      vignette: 0.12,
      bloom: 0.12,
    },
  },
  grd: {
    id: 'grd',
    label: 'GRD',
    shortLabel: 'GR',
    model: 'COMPACT STREET',
    cameraKind: 'compact',
    swatch: 'linear-gradient(135deg, #87998e, #2d3a35)',
    liveFilter: 'saturate(0.94) contrast(1.18) brightness(0.99)',
    captureFilter: 'saturate(0.94) contrast(1.18) brightness(0.99)',
    overlayClass: 'bg-[#708b85]/8 mix-blend-color',
    canvas: {
      saturation: 0.94,
      contrast: 1.18,
      brightness: 0.99,
      tint: '#708b85',
      tintOpacity: 0.08,
      grain: 0.035,
      vignette: 0.17,
      bloom: 0.03,
    },
  },
  fqs: {
    id: 'fqs',
    label: 'FQS',
    shortLabel: 'FLASH',
    model: 'FLASH FILM',
    cameraKind: 'instant',
    swatch: 'linear-gradient(135deg, #ffe4a6, #d86f68)',
    liveFilter: 'sepia(0.18) saturate(1.24) contrast(1.1) brightness(1.12)',
    captureFilter: 'sepia(0.18) saturate(1.24) contrast(1.1) brightness(1.12)',
    overlayClass: 'bg-[#ffc078]/15 mix-blend-soft-light',
    canvas: {
      saturation: 1.24,
      contrast: 1.1,
      brightness: 1.12,
      tint: '#ffc078',
      tintOpacity: 0.15,
      grain: 0.1,
      vignette: 0.2,
      bloom: 0.24,
    },
  },
  'd-funs': {
    id: 'd-funs',
    label: 'D FunS',
    shortLabel: 'FUNS',
    model: 'NIGHT SNAP',
    cameraKind: 'cine',
    swatch: 'linear-gradient(135deg, #6e89ff, #1b2452)',
    liveFilter: 'saturate(1.4) contrast(1.34) brightness(0.96) hue-rotate(196deg)',
    captureFilter: 'saturate(1.4) contrast(1.34) brightness(0.96) hue-rotate(196deg)',
    overlayClass: 'bg-[#263b91]/18 mix-blend-color',
    canvas: {
      saturation: 1.4,
      contrast: 1.34,
      brightness: 0.96,
      tint: '#263b91',
      tintOpacity: 0.18,
      grain: 0.09,
      vignette: 0.3,
      bloom: 0.08,
    },
  },
  'classic-u': {
    id: 'classic-u',
    label: 'Classic U',
    shortLabel: 'CLASSIC',
    model: 'WARM 35MM',
    cameraKind: 'retro',
    swatch: 'linear-gradient(135deg, #f0ba79, #b9644e)',
    liveFilter: 'sepia(0.38) saturate(1.07) contrast(0.96) brightness(1.06)',
    captureFilter: 'sepia(0.38) saturate(1.07) contrast(0.96) brightness(1.06)',
    overlayClass: 'bg-[#e4a261]/18 mix-blend-screen',
    canvas: {
      saturation: 1.07,
      contrast: 0.96,
      brightness: 1.06,
      tint: '#e4a261',
      tintOpacity: 0.18,
      grain: 0.12,
      vignette: 0.16,
      bloom: 0.16,
    },
  },
}

export function getCameraFilter(id: CameraFilterId) {
  return cameraFilters[id]
}
