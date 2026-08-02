import type {
  FilterId,
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
} from '../types'

type ExportPolaroidOptions = {
  photos: MockPhoto[]
  filterId: FilterId
  paperId: PolaroidPaperId
  backdropId: PolaroidBackdropId
  frameId: PolaroidFrameId
  footerText: string
}

const paperColors: Record<PolaroidPaperId, string> = {
  white: '#ffffff',
  cream: '#fff7e7',
  pink: '#ffe4ed',
  blue: '#dff4ff',
  black: '#161316',
}

const textColors: Record<PolaroidPaperId, string> = {
  white: '#161316',
  cream: '#2a2019',
  pink: '#4a2531',
  blue: '#1f4251',
  black: '#fffaf7',
}

const filterStyles: Record<FilterId, string> = {
  original: 'none',
  mono: 'grayscale(1) contrast(1.03)',
  'sun-kiss': 'sepia(0.2) saturate(1.16) brightness(1.04)',
  'cool-pop': 'hue-rotate(188deg) saturate(0.94) contrast(1.04)',
}

function roundedRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath()
  context.roundRect(x, y, width, height, radius)
  context.closePath()
}

function drawPaperBackdrop(context: CanvasRenderingContext2D, backdropId: PolaroidBackdropId) {
  if (backdropId === 'none') {
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }

  if (backdropId === 'blue' || backdropId === 'cream-paper') {
    context.fillStyle = backdropId === 'blue' ? '#dff4ff' : '#fff2d7'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
  }

  if (backdropId === 'pink-grid') {
    context.strokeStyle = '#f6ccd8'
    context.lineWidth = 2
    for (let position = 0; position <= context.canvas.width; position += 48) {
      context.beginPath()
      context.moveTo(position, 0)
      context.lineTo(position, context.canvas.height)
      context.stroke()
    }
    for (let position = 0; position <= context.canvas.height; position += 48) {
      context.beginPath()
      context.moveTo(0, position)
      context.lineTo(context.canvas.width, position)
      context.stroke()
    }
  }
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = reject
    image.src = source
  })
}

function drawCoverImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  filterId: FilterId,
) {
  const scale = Math.max(width / image.naturalWidth, height / image.naturalHeight)
  const sourceWidth = width / scale
  const sourceHeight = height / scale
  const sourceX = (image.naturalWidth - sourceWidth) / 2
  const sourceY = (image.naturalHeight - sourceHeight) / 2

  context.save()
  roundedRect(context, x, y, width, height, radius)
  context.clip()
  context.filter = filterStyles[filterId]
  context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, x, y, width, height)
  context.restore()
}

export async function createPolaroidPng({
  photos,
  filterId,
  paperId,
  backdropId,
  frameId,
  footerText,
}: ExportPolaroidOptions): Promise<Blob> {
  const hasFooter = Boolean(footerText.trim())
  const canvas = document.createElement('canvas')
  // The export is cropped exactly to the physical photo strip. Page background
  // and surrounding UI are deliberately outside this canvas.
  canvas.width = 960
  canvas.height = hasFooter ? 4040 : 3916
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is not available')

  const paperX = 39
  const paperY = 39
  const paperWidth = canvas.width - 78
  const paperHeight = canvas.height - 78
  const paperColor = paperColors[paperId]
  const textColor = textColors[paperId]
  roundedRect(context, paperX, paperY, paperWidth, paperHeight, 52)
  context.fillStyle = paperColor
  context.fill()
  drawPaperBackdrop(context, backdropId)
  roundedRect(context, paperX, paperY, paperWidth, paperHeight, 52)
  context.clip()
  context.fillStyle = paperColor
  context.globalAlpha = backdropId === 'none' ? 1 : 0.78
  context.fill()
  context.globalAlpha = 1
  roundedRect(context, paperX, paperY, paperWidth, paperHeight, 52)
  context.strokeStyle = 'rgba(22, 19, 22, 0.10)'
  context.lineWidth = 3
  context.stroke()

  const frameColor = frameId === 'black' ? '#161316' : '#ffffff'
  const frameWidth = frameId === 'none' ? 0 : frameId === 'soft-white' ? 34 : 24
  // These measurements mirror the preview: a narrow vertical four-cut strip
  // with 4:4.65 frames, not a wide collage.
  const contentX = paperX + 52
  const contentWidth = paperWidth - 104
  const photoHeight = (contentWidth * 4.65) / 4
  const photoGap = 39
  const photoStartY = paperY + 52

  for (let index = 0; index < 4; index += 1) {
    const photoY = photoStartY + index * (photoHeight + photoGap)
    const frameX = contentX - frameWidth
    const frameY = photoY - frameWidth
    const frameSizeWidth = contentWidth + frameWidth * 2
    const frameSizeHeight = photoHeight + frameWidth * 2

    if (frameWidth) {
      roundedRect(context, frameX, frameY, frameSizeWidth, frameSizeHeight, frameId === 'soft-white' ? 30 : 20)
      context.fillStyle = frameColor
      context.fill()
    }

    const photo = photos[index]
    if (photo?.src) {
      const image = await loadImage(photo.src)
      drawCoverImage(context, image, contentX, photoY, contentWidth, photoHeight, 14, filterId)
    } else {
      roundedRect(context, contentX, photoY, contentWidth, photoHeight, 14)
      context.fillStyle = '#f5ebe4'
      context.fill()
      context.fillStyle = '#a4888c'
      context.font = '600 24px system-ui, sans-serif'
      context.textAlign = 'center'
      context.fillText(`EMPTY 0${index + 1}`, canvas.width / 2, photoY + photoHeight / 2)
    }
  }

  if (hasFooter) {
    context.fillStyle = textColor
    context.textAlign = 'center'
    context.font = '600 36px system-ui, sans-serif'
    context.fillText(footerText.trim(), canvas.width / 2, 3935)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG encoding failed'))), 'image/png')
  })
}
