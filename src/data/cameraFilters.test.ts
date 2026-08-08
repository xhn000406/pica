import { describe, expect, it } from 'vitest'

import { cameraFilterOrder, getCameraFilter } from './cameraFilters'

describe('camera lens presets', () => {
  it('keeps Original first and exposes the five Dazz-inspired camera looks', () => {
    expect(cameraFilterOrder).toEqual([
      'original',
      'fxn',
      'grd',
      'fqs',
      'd-funs',
      'classic-u',
    ])
    expect(getCameraFilter('original').canvas.grain).toBe(0)
    expect(getCameraFilter('fxn').label).toBe('FXN')
    expect(getCameraFilter('grd').label).toBe('GRD')
    expect(getCameraFilter('fqs').label).toBe('FQS')
    expect(getCameraFilter('d-funs').label).toBe('D FunS')
    expect(getCameraFilter('classic-u').label).toBe('Classic U')
  })
})
