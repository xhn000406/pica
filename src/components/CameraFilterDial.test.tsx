import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CameraFilterDial } from './CameraFilterDial'

describe('CameraFilterDial', () => {
  it('selects the requested camera look before capture', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()

    render(<CameraFilterDial value="original" disabled={false} onChange={onChange} />)
    expect(screen.getByText('FUJIFILM STYLE')).toBeTruthy()
    await user.click(screen.getByRole('button', { name: /select FXN camera look/i }))

    expect(onChange).toHaveBeenCalledWith('fxn')
  })
})
