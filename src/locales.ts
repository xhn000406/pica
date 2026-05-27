import type { AppLocale } from './types'

export const localeStorageKey = 'pica-booth.locale'

export const supportedLocales: AppLocale[] = ['zh-CN', 'en-US']

export const messages = {
  'zh-CN': {
    common: {
      brand: 'Pica Booth',
      languageSwitch: '语言切换',
      chinese: '中文',
      english: 'English',
    },
    app: {
      headerDescription:
        '第一阶段专注于漂亮的静态 MVP，包含 mock 拍摄、photo strip 样式、响应式布局、GSAP 动画，以及 Lottie 预留位。',
      footerGuardrails:
        '阶段边界：不接真实摄像头、不做真实 Canvas 导出、不做后端、不做登录。',
    },
    steps: {
      ariaLabel: '拍照亭流程',
      start: { label: '开始', note: '入口' },
      camera: { label: '拍摄', note: 'mock 拍照' },
      edit: { label: '编辑', note: '样式调整' },
      export: { label: '导出', note: 'mock 下载' },
    },
    start: {
      badge: 'React 拍照亭 . 第一阶段',
      eyebrow: '可爱 . 干净 . 明亮',
      title: '在真实摄像头接入前，先做一条会让人想保存的照片条。',
      description:
        '这一阶段不是普通官网首页，而是一个真正能进入流程的拍照亭入口：你可以走完整个四连拍 mock 流程，调整 photo strip 风格，并预览导出结果。',
      startButton: '开始体验',
      metaPill: '4 个页面已连通 . 移动端适配 . 仅 mock 图片',
      previewTitle: '照片条预览',
      previewSubtitle: 'mock 视觉快照',
      stageBadge: '阶段 01',
      highlightOneTitle: '先做 mock 拍摄',
      highlightOneDescription: '第一阶段用精心设计的 mock 画面替代真实摄像头。',
      highlightTwoTitle: '先把风格跑通',
      highlightTwoDescription: '支持边框、滤镜和贴纸入口 UI，先把体验打磨顺。',
      highlightThreeTitle: '动效框架已就位',
      highlightThreeDescription: 'GSAP 基础动效已接入，同时预留了 Lottie 动画区域。',
    },
    camera: {
      pageLabel: '拍摄页',
      title: '先用有现场感的预览，把 booth 会话演练出来。',
      shotCount: '{{count}} / 4 张',
      cameraFeed: 'mock 相机画面',
      flashReady: 'flash UI 已预留',
      currentFrame: '当前画面',
      boothMode: '拍照状态',
      captureIn: '{{count}} 秒后拍摄',
      readyToSnap: '准备拍摄',
      allShotsCaptured: '四张已拍完',
      takeMockShot: '拍一张 mock',
      restart: '重新开始',
      continueToEdit: '继续编辑',
      sessionStrip: '会话照片条',
      fillSlots: '用 mock 拍摄填满每个画面位',
      previewBadge: '预览',
      phaseNoteTitle: '阶段说明',
      phaseNoteBody:
        '这一阶段里的相机画面、倒计时、闪光和拍摄进度都只是 UI mock。真实摄像头接入和 Canvas 合成会放到下一阶段。',
    },
    edit: {
      pageLabel: '编辑页',
      title: '在导出前把照片条风格调顺。',
      description:
        '这一页只做前端交互打磨。边框切换、滤镜预览和贴纸入口都是即时视觉反馈，暂时不接真实 Canvas 渲染。',
      borderColorsTitle: '边框颜色',
      borderColorsNote: '照片条外壳色',
      borderPreset: '边框预设',
      filtersTitle: '滤镜',
      filtersNote: '仅做预览样式',
      stickerEntryTitle: '贴纸入口',
      stickerEntryNote: '第一阶段的轻量入口 UI',
      liveStrip: '实时照片条',
      liveStripSubtitle: '兼顾桌面端和移动端的预览',
      mockComposition: 'mock 合成',
      currentMix: '当前组合',
      border: '边框',
      filter: '滤镜',
      stickers: '贴纸',
      backToCamera: '返回拍摄',
      continueToExport: '继续导出',
    },
    export: {
      pageLabel: '导出页',
      title: '用一个完整的完成页，承接最终照片条预览和 mock 下载。',
      description:
        '虽然第一阶段的下载仍然只是前端占位，但这个页面已经具备真实终点页的节奏：预览、主按钮和成功动画预留区都到位了。',
      finalStrip: '最终照片条',
      finalStripSubtitle: '可导出的 mock 版本',
      waiting: '等待中',
      savedMock: '已 mock 保存',
      exportActions: '导出操作',
      exportActionsDescription:
        '下面的按钮只会模拟 PNG 导出状态变化，不会真的生成文件或触发下载，这一版是按规格保留为 mock。',
      downloadMock: '下载 PNG（mock）',
      retake: '重拍',
      successMessage:
        'mock 下载已完成。这里目前只是 UI 成功状态，真实 PNG 导出会放到后续阶段。',
    },
    options: {
      border: {
        butter: '奶油黄',
        blush: '蜜桃粉',
        mint: '薄荷绿',
        midnight: '午夜色',
      },
      filter: {
        original: { label: '原始', note: '干净棚拍光感' },
        mono: { label: '黑白', note: '复古灰阶感' },
        'sun-kiss': { label: '暖阳', note: '轻微胶片暖调' },
        'cool-pop': { label: '冷泡泡', note: '糖果蓝冷色感' },
      },
      sticker: {
        spark: { label: '闪闪', note: '顶部徽章' },
        bestie: { label: '好友', note: '侧边情绪贴' },
        date: { label: '日期', note: '时间戳感' },
        flash: { label: '闪光', note: '底部徽章' },
      },
    },
    strip: {
      title: 'Pica Booth',
      subtitle: '第一阶段 mock 照片条',
      ready: '已就绪',
      openSlot: '空位',
      waitingShot: '等待 mock 拍摄',
      studioGlow: '棚拍氛围',
      shotsCount: '4 连拍',
      stickerSpark: '闪闪',
      stickerBestie: '好友',
      stickerFlash: '闪光',
    },
    lottie: {
      title: 'Lottie 动画预留位',
      description: '第一阶段先把成功动效和庆祝动效的位置预留好。',
    },
    photos: {
      'bubble-day': { title: '泡泡日', caption: '轻轻微笑 . 第 01 张' },
      'mint-loop': { title: '薄荷循环', caption: '眨眼模式 . 第 02 张' },
      'sky-pop': { title: '天空糖', caption: '大笑瞬间 . 第 03 张' },
      'berry-bloom': { title: '莓果绽放', caption: '定格姿势 . 第 04 张' },
    },
  },
  'en-US': {
    common: {
      brand: 'Pica Booth',
      languageSwitch: 'Language switch',
      chinese: '中文',
      english: 'English',
    },
    app: {
      headerDescription:
        'Phase 01 focuses on a beautiful static MVP with mock capture, photo strip styling, responsive layouts, GSAP motion, and Lottie-ready placeholders.',
      footerGuardrails:
        'Stage guardrails: no real camera, no real Canvas export, no backend, no login.',
    },
    steps: {
      ariaLabel: 'Photo booth flow',
      start: { label: 'Start', note: 'entry' },
      camera: { label: 'Camera', note: 'mock capture' },
      edit: { label: 'Edit', note: 'strip styling' },
      export: { label: 'Export', note: 'mock download' },
    },
    start: {
      badge: 'React photo booth . phase 01',
      eyebrow: 'Cute . clean . bright',
      title: 'Make a playful photo strip before the real camera lands.',
      description:
        'This first stage behaves like a polished booth entrance instead of a marketing page: you can step into the flow, mock a four-shot session, tune the strip look, and preview export without backend or real image composition.',
      startButton: 'Start booth',
      metaPill: '4 pages connected . mobile-ready . mock photos only',
      previewTitle: 'Strip preview',
      previewSubtitle: 'mock aesthetic snapshot',
      stageBadge: 'stage 01',
      highlightOneTitle: 'Mock capture first',
      highlightOneDescription: 'Phase 01 uses curated mock frames instead of a real camera.',
      highlightTwoTitle: 'Style before export',
      highlightTwoDescription: 'Swap strip borders, preview filters, and sticker entry UI.',
      highlightThreeTitle: 'Motion-ready shell',
      highlightThreeDescription: 'GSAP transitions are in place and Lottie space is reserved.',
    },
    camera: {
      pageLabel: 'Camera page',
      title: 'Mock the booth session with a live-feeling preview.',
      shotCount: '{{count}} / 4 shots',
      cameraFeed: 'mock camera feed',
      flashReady: 'flash UI ready',
      currentFrame: 'current frame',
      boothMode: 'booth mode',
      captureIn: 'capture in {{count}}',
      readyToSnap: 'ready to snap',
      allShotsCaptured: 'All shots captured',
      takeMockShot: 'Take mock shot',
      restart: 'Restart',
      continueToEdit: 'Continue to edit',
      sessionStrip: 'Session strip',
      fillSlots: 'fill each slot with mock captures',
      previewBadge: 'preview',
      phaseNoteTitle: 'Phase note',
      phaseNoteBody:
        'The camera feed, countdown, flash, and capture progress are all UI mocks in this phase. Real camera access and Canvas composition stay out of scope until the next stage.',
    },
    edit: {
      pageLabel: 'Edit page',
      title: 'Style the strip before export.',
      description:
        'This stage focuses on polished front-end controls only. Border switching, filter preview, and sticker entry stay visual and immediate, without real Canvas rendering yet.',
      borderColorsTitle: 'Border colors',
      borderColorsNote: 'strip shell tones',
      borderPreset: 'border preset',
      filtersTitle: 'Filters',
      filtersNote: 'preview-only styles',
      stickerEntryTitle: 'Sticker entry',
      stickerEntryNote: 'simple UI hooks for phase 01',
      liveStrip: 'Live strip',
      liveStripSubtitle: 'responsive preview for desktop and mobile',
      mockComposition: 'mock composition',
      currentMix: 'Current mix',
      border: 'Border',
      filter: 'Filter',
      stickers: 'Stickers',
      backToCamera: 'Back to camera',
      continueToExport: 'Continue to export',
    },
    export: {
      pageLabel: 'Export page',
      title: 'Final strip preview with a mock download handoff.',
      description:
        'Download remains a front-end placeholder in phase 01, but the export screen already behaves like a real finish line with preview, CTA, and a reserved motion zone.',
      finalStrip: 'Final strip',
      finalStripSubtitle: 'ready-for-export mock',
      waiting: 'waiting',
      savedMock: 'saved mock',
      exportActions: 'Export actions',
      exportActionsDescription:
        'The button below only simulates a PNG export state change in this phase. No real file generation or download happens yet, by design.',
      downloadMock: 'Download PNG (mock)',
      retake: 'Retake',
      successMessage:
        'Mock download complete. This is a UI-only success state reserved for a real PNG export in a later phase.',
    },
    options: {
      border: {
        butter: 'Butter',
        blush: 'Blush',
        mint: 'Mint',
        midnight: 'Midnight',
      },
      filter: {
        original: { label: 'Original', note: 'clean booth light' },
        mono: { label: 'Mono', note: 'retro grayscale' },
        'sun-kiss': { label: 'Sun Kiss', note: 'warm print tint' },
        'cool-pop': { label: 'Cool Pop', note: 'blue candy cast' },
      },
      sticker: {
        spark: { label: 'Spark', note: 'top badge' },
        bestie: { label: 'Bestie', note: 'side mood tag' },
        date: { label: 'Date', note: 'timestamp feel' },
        flash: { label: 'Flash', note: 'bottom badge' },
      },
    },
    strip: {
      title: 'Pica Booth',
      subtitle: 'phase 01 mock strip',
      ready: 'ready',
      openSlot: 'Open slot',
      waitingShot: 'waiting for mock shot',
      studioGlow: 'studio glow',
      shotsCount: '4 shots',
      stickerSpark: 'spark',
      stickerBestie: 'bestie',
      stickerFlash: 'flash',
    },
    lottie: {
      title: 'Lottie motion slot',
      description:
        'Phase 01 keeps this as a reserved animation area for success and celebratory motion.',
    },
    photos: {
      'bubble-day': { title: 'Bubble Day', caption: 'soft grin . frame 01' },
      'mint-loop': { title: 'Mint Loop', caption: 'wink mode . frame 02' },
      'sky-pop': { title: 'Sky Pop', caption: 'big laugh . frame 03' },
      'berry-bloom': { title: 'Berry Bloom', caption: 'pose lock . frame 04' },
    },
  },
} as const

const chinaTimeZones = new Set([
  'Asia/Shanghai',
  'Asia/Urumqi',
  'Asia/Hong_Kong',
  'Asia/Macau',
  'Asia/Taipei',
])

export function isSupportedLocale(value: string): value is AppLocale {
  return supportedLocales.includes(value as AppLocale)
}

export function resolveInitialLocale(): AppLocale {
  const storedLocale = window.localStorage.getItem(localeStorageKey)

  if (storedLocale && isSupportedLocale(storedLocale)) {
    return storedLocale
  }

  const browserLocales = navigator.languages?.length
    ? navigator.languages
    : [navigator.language]

  if (browserLocales.some((locale) => locale.toLowerCase().startsWith('zh'))) {
    return 'zh-CN'
  }

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  if (chinaTimeZones.has(timeZone)) {
    return 'zh-CN'
  }

  return 'en-US'
}

export function getMessage(locale: AppLocale, path: string): string {
  const parts = path.split('.')
  let value: unknown = messages[locale]

  for (const part of parts) {
    if (typeof value !== 'object' || value === null || !(part in value)) {
      return path
    }

    value = (value as Record<string, unknown>)[part]
  }

  return typeof value === 'string' ? value : path
}
