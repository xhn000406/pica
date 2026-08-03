import type { CameraFilterPreset } from '../data/cameraFilters'

function hexToRgb(hex: string) {
  const normalized = hex.replace('#', '')
  return {
    red: Number.parseInt(normalized.slice(0, 2), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    blue: Number.parseInt(normalized.slice(4, 6), 16),
  }
}

function addGrain(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
) {
  if (!amount) return

  const grainCanvas = document.createElement('canvas')
  grainCanvas.width = width
  grainCanvas.height = height
  const grainContext = grainCanvas.getContext('2d')
  if (!grainContext) return

  const grain = grainContext.createImageData(width, height)
  const strength = Math.round(amount * 72)

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = (y * width + x) * 4
      const noise = ((x * 17 + y * 31 + x * y * 7) % 29) - 14
      const value = Math.max(0, Math.min(255, 128 + noise * strength))
      grain.data[index] = value
      grain.data[index + 1] = value
      grain.data[index + 2] = value
      grain.data[index + 3] = 255
    }
  }

  grainContext.putImageData(grain, 0, 0)
  context.save()
  context.globalCompositeOperation = 'soft-light'
  context.globalAlpha = amount * 0.8
  context.drawImage(grainCanvas, 0, 0)
  context.restore()
}

export function renderCameraFilter(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  preset: CameraFilterPreset,
) {
  if (preset.id === 'original') return

  const tint = hexToRgb(preset.canvas.tint)
  const centerX = width / 2
  const centerY = height / 2

  context.save()
  context.globalCompositeOperation = 'color'
  context.fillStyle = `rgb(${tint.red} ${tint.green} ${tint.blue})`
  context.globalAlpha = preset.canvas.tintOpacity
  context.fillRect(0, 0, width, height)

  if (preset.canvas.bloom) {
    const bloom = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, width * 0.72)
    bloom.addColorStop(0, `rgba(255,255,255,${preset.canvas.bloom})`)
    bloom.addColorStop(1, 'rgba(255,255,255,0)')
    context.globalCompositeOperation = 'screen'
    context.globalAlpha = 1
    context.fillStyle = bloom
    context.fillRect(0, 0, width, height)
  }

  if (preset.canvas.vignette) {
    const vignette = context.createRadialGradient(centerX, centerY, width * 0.18, centerX, centerY, width * 0.78)
    vignette.addColorStop(0, 'rgba(0,0,0,0)')
    vignette.addColorStop(1, `rgba(0,0,0,${preset.canvas.vignette})`)
    context.globalCompositeOperation = 'multiply'
    context.fillStyle = vignette
    context.fillRect(0, 0, width, height)
  }

  context.restore()
  addGrain(context, width, height, preset.canvas.grain)
}
