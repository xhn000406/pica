export type AppLocale = 'zh-CN' | 'en-US'

export type AppPage = 'start' | 'camera' | 'edit' | 'export'

export type LayoutId = 'a' | 'b' | 'c' | 'd' | 'traditional'

export type LayoutArrangement = 'vertical' | 'grid-2x2'

export type StripLayout = {
  id: LayoutId
  shotCount: number
  arrangement: LayoutArrangement
  /** Capture & cell width / height */
  photoAspect: number
  previewMaxWidth: number
}

export type BorderToneId = 'butter' | 'blush' | 'mint' | 'midnight'

export type FilterId = 'original' | 'mono' | 'sun-kiss' | 'cool-pop'

export type CameraFilterId =
  | 'original'
  | 'ccd-blue'
  | 'flash-2000'
  | 'film-35'
  | 'night-chrome'

export type StickerId = 'spark' | 'bestie' | 'date' | 'flash'

export type PolaroidPaperId = 'white' | 'cream' | 'pink' | 'blue' | 'black'

export type PolaroidBackdropId = 'none' | 'pink-grid' | 'blue' | 'cream-paper'

export type PolaroidFrameId = 'white' | 'black' | 'none' | 'soft-white'

export type MockPhoto = {
  id: string
  title: string
  caption: string
  src: string
  accent: string
}
