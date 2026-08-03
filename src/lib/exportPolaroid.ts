import type {
  FilterId,
  LayoutId,
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
} from '../types'
import { getStripLayout } from '../data/layouts'

type ExportPolaroidOptions = {
  photos: MockPhoto[]
  filterId: FilterId
  paperId: PolaroidPaperId
  backdropId: PolaroidBackdropId
  frameId: PolaroidFrameId
  footerText: string
  layoutId?: LayoutId
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

async function drawPhotoCell(
  context: CanvasRenderingContext2D,
  photos: MockPhoto[],
  index: number,
  x: number,
  y: number,
  width: number,
  height: number,
  frameWidth: number,
  frameColor: string,
  frameId: PolaroidFrameId,
  filterId: FilterId,
  canvasWidth: number,
) {
  if (frameWidth) {
    roundedRect(
      context,
      x - frameWidth,
      y - frameWidth,
      width + frameWidth * 2,
      height + frameWidth * 2,
      frameId === 'soft-white' ? 30 : 20,
    )
    context.fillStyle = frameColor
    context.fill()
  }

  const photo = photos[index]
  if (photo?.src) {
    const image = await loadImage(photo.src)
    drawCoverImage(context, image, x, y, width, height, 14, filterId)
  } else {
    roundedRect(context, x, y, width, height, 14)
    context.fillStyle = '#f5ebe4'
    context.fill()
    context.fillStyle = '#a4888c'
    context.font = '600 24px system-ui, sans-serif'
    context.textAlign = 'center'
    context.fillText(`EMPTY 0${index + 1}`, canvasWidth / 2, y + height / 2)
  }
}

export async function createPolaroidPng({
  photos,
  filterId,
  paperId,
  backdropId,
  frameId,
  footerText,
  layoutId = 'a',
}: ExportPolaroidOptions): Promise<Blob> {
  const layout = getStripLayout(layoutId)
  const hasFooter = Boolean(footerText.trim())
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Canvas is not available')

  const frameColor = frameId === 'black' ? '#161316' : '#ffffff'
  const frameWidth = frameId === 'none' ? 0 : frameId === 'soft-white' ? 34 : 24
  const paperInset = 39
  const contentInset = 52
  const photoGap = layout.arrangement === 'grid-2x2' ? 28 : 39
  const footerBand = hasFooter ? 120 : 0

  if (layout.arrangement === 'grid-2x2') {
    canvas.width = 1200
    const contentWidth = canvas.width - paperInset * 2 - contentInset * 2
    const cellWidth = (contentWidth - photoGap) / 2
    const cellHeight = cellWidth / layout.photoAspect
    const contentHeight = cellHeight * 2 + photoGap
    canvas.height = paperInset * 2 + contentInset * 2 + contentHeight + footerBand
  } else {
    const baseWidth = layout.id === 'traditional' ? 820 : layout.id === 'c' ? 1100 : 960
    canvas.width = baseWidth
    const contentWidth = canvas.width - paperInset * 2 - contentInset * 2
    const photoHeight = contentWidth / layout.photoAspect
    const contentHeight =
      layout.shotCount * photoHeight + (layout.shotCount - 1) * photoGap
    canvas.height = paperInset * 2 + contentInset * 2 + contentHeight + footerBand
  }

  const paperX = paperInset
  const paperY = paperInset
  const paperWidth = canvas.width - paperInset * 2
  const paperHeight = canvas.height - paperInset * 2 - (hasFooter ? 0 : 0)
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

  const contentX = paperX + contentInset
  const contentWidth = paperWidth - contentInset * 2
  const photoStartY = paperY + contentInset

  if (layout.arrangement === 'grid-2x2') {
    const cellWidth = (contentWidth - photoGap) / 2
    const cellHeight = cellWidth / layout.photoAspect

    for (let index = 0; index < layout.shotCount; index += 1) {
      const col = index % 2
      const row = Math.floor(index / 2)
      const x = contentX + col * (cellWidth + photoGap)
      const y = photoStartY + row * (cellHeight + photoGap)
      await drawPhotoCell(
        context,
        photos,
        index,
        x,
        y,
        cellWidth,
        cellHeight,
        frameWidth,
        frameColor,
        frameId,
        filterId,
        canvas.width,
      )
    }
  } else {
    const photoHeight = contentWidth / layout.photoAspect

    for (let index = 0; index < layout.shotCount; index += 1) {
      const y = photoStartY + index * (photoHeight + photoGap)
      await drawPhotoCell(
        context,
        photos,
        index,
        contentX,
        y,
        contentWidth,
        photoHeight,
        frameWidth,
        frameColor,
        frameId,
        filterId,
        canvas.width,
      )
    }
  }

  if (hasFooter) {
    context.fillStyle = textColor
    context.textAlign = 'center'
    context.font = '600 36px system-ui, sans-serif'
    context.fillText(footerText.trim(), canvas.width / 2, canvas.height - 48)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('PNG encoding failed'))), 'image/png')
  })
}
