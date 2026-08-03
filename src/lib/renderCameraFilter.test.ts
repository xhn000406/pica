import { describe, expect, it, vi } from 'vitest'

import { getCameraFilter } from '../data/cameraFilters'
import { renderCameraFilter } from './renderCameraFilter'

describe('renderCameraFilter', () => {
  it('does not alter the canvas for Original', () => {
    const context = {
      filter: 'none',
      globalAlpha: 1,
      save: vi.fn(),
      restore: vi.fn(),
    } as unknown as CanvasRenderingContext2D

    renderCameraFilter(context, 600, 800, getCameraFilter('original'))

    expect(context.filter).toBe('none')
    expect(context.globalAlpha).toBe(1)
  })
})
