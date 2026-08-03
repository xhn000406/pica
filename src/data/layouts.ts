import type { LayoutId, StripLayout } from '../types'

export const stripLayouts: Record<LayoutId, StripLayout> = {
  a: {
    id: 'a',
    shotCount: 4,
    arrangement: 'vertical',
    photoAspect: 4 / 4.65,
    previewMaxWidth: 292,
  },
  b: {
    id: 'b',
    shotCount: 3,
    arrangement: 'vertical',
    photoAspect: 4 / 4.65,
    previewMaxWidth: 292,
  },
  c: {
    id: 'c',
    shotCount: 2,
    arrangement: 'vertical',
    photoAspect: 4 / 3,
    previewMaxWidth: 340,
  },
  d: {
    id: 'd',
    shotCount: 4,
    arrangement: 'grid-2x2',
    photoAspect: 1,
    previewMaxWidth: 420,
  },
  traditional: {
    id: 'traditional',
    shotCount: 4,
    arrangement: 'vertical',
    photoAspect: 3 / 4,
    previewMaxWidth: 260,
  },
}

export const layoutOrder: LayoutId[] = ['a', 'b', 'c', 'd', 'traditional']

export const defaultLayoutId: LayoutId = 'a'

export function getStripLayout(id: LayoutId): StripLayout {
  return stripLayouts[id]
}
