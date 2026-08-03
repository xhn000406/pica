import { describe, expect, it } from 'vitest'

import { cameraFilterOrder, getCameraFilter } from './cameraFilters'

describe('camera lens presets', () => {
  it('keeps Original first and exposes the four approved camera looks', () => {
    expect(cameraFilterOrder).toEqual([
      'original',
      'ccd-blue',
      'flash-2000',
      'film-35',
      'night-chrome',
    ])
    expect(getCameraFilter('original').canvas.grain).toBe(0)
    expect(getCameraFilter('ccd-blue').canvas.tint).toBe('#65d9ff')
  })
})
