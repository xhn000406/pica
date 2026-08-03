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
        '第二阶段已接入真实摄像头与四连拍，保留 photo strip 样式、响应式布局和 GSAP 动画。',
      footerGuardrails:
        '摄像头只在浏览器本地使用；照片不会上传。',
    },
    flow: {
      lockedStage: '拍满当前布局所需张数后，这一阶段会自然解锁。',
    },
    layout: {
      pageLabel: '布局',
      title: '选择拍立得布局',
      description: '先选好版式，再开始连拍。张数与成片排列会跟所选布局一致。',
      lockedHint: '已开始拍摄后暂不可换布局，可点「重新开始」再切换。',
      options: {
        a: { name: '布局 A', poses: '{{count}} Pose' },
        b: { name: '布局 B', poses: '{{count}} Pose' },
        c: { name: '布局 C', poses: '{{count}} Pose' },
        d: { name: '布局 D', poses: '{{count}} Pose' },
        traditional: { name: '经典拍立得', poses: '{{count}} Pose Vertical' },
      },
    },
    steps: {
      ariaLabel: '拍照亭流程',
      start: { label: '开始', note: '入口' },
      camera: { label: '拍摄', note: '真实相机' },
      edit: { label: '编辑', note: '样式调整' },
      export: { label: '导出', note: '保存成品' },
    },
    start: {
      badge: 'SELF PHOTO BOOTH',
      eyebrow: 'clean . soft . shareable',
      title: 'Pica Booth',
      description:
        '在家也能拍一条韩系拍立得。选布局、连拍、调风格，成片只留在你的浏览器里。',
      startButton: 'START',
      metaPill: '真实摄像头 . 手机与桌面适配 . 本地处理',
      previewTitle: '照片条预览',
      previewSubtitle: '柔和相纸预览',
      stageBadge: '4 cuts',
      petPreviewTitle: '先来一点可爱氛围',
      petPreviewSubtitle: '把镜头留给今天的你',
      petPreviewBadge: 'mood board',
      dogAlt: '粉色背景中的小狗',
      catAlt: '柔光下的小猫',
      highlightOneTitle: '真实四连拍',
      highlightOneDescription: '支持手机、macOS 与 Windows 浏览器摄像头授权和真实截图。',
      highlightTwoTitle: '柔和成片风格',
      highlightTwoDescription: '边框、滤镜和贴纸都围绕韩系自拍馆的干净质感。',
      highlightThreeTitle: '适合分享',
      highlightThreeDescription: '照片条预览始终是主角，拍完就能进入编辑和保存流程。',
    },
    camera: {
      pageLabel: '拍摄页',
      title: '授权摄像头，开始一组真实连拍。',
      shotCount: '{{count}} / {{total}} 张',
      cameraFeed: '等待摄像头',
      liveFeed: '实时摄像头',
      livePreview: '实时摄像头预览',
      flashReady: '闪光准备',
      currentFrame: '当前画面',
      liveCamera: '实时取景',
      lensLooks: '镜头风格',
      lensHint: '原片直出为默认；拍第一张前可切换。',
      lensLocked: '已开始拍摄，本组镜头风格已锁定。',
      boothMode: '拍照状态',
      captureIn: '{{count}} 秒后拍摄',
      readyToSnap: '准备拍摄',
      allShotsCaptured: '本组已拍完',
      takePhoto: '拍一张',
      capturedTitle: '照片 {{count}}',
      capturedCaption: '真实摄像头拍摄',
      enableCamera: '开启摄像头',
      retryCamera: '重新尝试',
      switchCamera: '切换镜头',
      permissionTitle: '需要摄像头权限',
      permissionDescription:
        '点击开启后，浏览器会请求摄像头权限。画面和照片仅在当前设备中处理，不会上传。',
      requestingPermission: '正在等待浏览器授权…',
      permissionDenied: '摄像头权限被拒绝',
      cameraUnavailable: '没有找到可用摄像头',
      cameraBusy: '摄像头正在被其他应用占用',
      insecureContext: '当前页面不能安全访问摄像头',
      cameraError: '摄像头启动失败',
      permissionHelp: {
        ios: '请在 iPhone/iPad 的“设置”中允许当前浏览器使用摄像头，然后回到页面重试。网页需通过 HTTPS 打开。',
        android:
          '请在浏览器的网站设置和 Android 应用权限中允许摄像头，然后回到页面重试。网页需通过 HTTPS 打开。',
        mac: '请检查浏览器地址栏的网站权限，以及“系统设置 → 隐私与安全性 → 摄像头”中的浏览器权限。',
        windows:
          '请检查浏览器地址栏的网站权限，以及“设置 → 隐私和安全性 → 摄像头”中的浏览器访问权限。',
        other: '请在浏览器的网站权限和设备的隐私设置中允许摄像头，然后返回页面重试。',
      },
      restart: '重新开始',
      continueToEdit: '继续编辑',
      sessionStrip: '会话照片条',
      fillSlots: '用真实拍摄填满每个画面位',
      previewBadge: '预览',
      phaseNoteTitle: '隐私说明',
      phaseNoteBody:
        '摄像头画面和截图只在浏览器内处理，不会上传到服务器。离开或刷新页面后，本次拍摄内容会被清除。',
    },
    edit: {
      pageLabel: '编辑页',
      title: '在导出前把照片条风格调顺。',
      polaroidTitle: '编辑这张拍立得。',
      polaroidDescription:
        '照片会按所选布局组成拍立得成片，你可以调整滤镜与相纸颜色。',
      description:
        '选择一套柔和的滤镜和相纸，让连拍更像一条可以分享的自拍馆成片。',
      borderColorsTitle: '边框颜色',
      borderColorsNote: '照片条外壳色',
      borderPreset: '边框预设',
      filtersTitle: '滤镜',
      filtersNote: '轻量照片氛围',
      paperTitle: '相纸颜色',
      paperNote: '选择拍立得外层相纸',
      signatureTitle: '底部签名',
      signatureNote: '不填写则隐藏底部文字',
      signaturePlaceholder: '例如：Summer 2026 · Mia & Leo',
      backdropTitle: '底板',
      backdropNote: '给成片加一层背景感',
      frameTitle: '边框',
      frameNote: '白边、黑边或无边框',
      stickerEntryTitle: '贴纸入口',
      stickerEntryNote: '给照片条加一点情绪',
      liveStrip: '实时照片条',
      liveStripSubtitle: '兼顾桌面端和移动端的预览',
      mockComposition: '实时预览',
      currentMix: '当前组合',
      border: '边框',
      filter: '滤镜',
      stickers: '贴纸',
      backToCamera: '返回拍摄',
      continueToExport: '继续导出',
    },
    export: {
      pageLabel: '导出页',
      title: '最后检查一下，把你的照片条保存下来。',
      description:
        '成品页把照片条放在最重要的位置，适合检查边框、滤镜和贴纸的最终效果。',
      finalStrip: '最终照片条',
      finalStripSubtitle: '准备保存的成片预览',
      waiting: '等待中',
      savedMock: '已保存',
      exportActions: '导出操作',
      exportActionsDescription:
        '保存照片条，或者回到拍摄页重新拍一组更满意的四连拍。',
      downloadMock: '保存 PNG',
      downloadPng: '下载 PNG',
      shareImage: '分享图片',
      exporting: '正在生成…',
      retake: '重拍',
      successMessage: '照片条已生成，可在下载目录或系统分享记录中查看。',
      errorMessage: '生成图片失败，请稍后重试。',
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
      paper: {
        white: '白色',
        cream: '奶油',
        pink: '粉色',
        blue: '蓝色',
        black: '黑色',
      },
      backdrop: {
        none: '无底板',
        pinkGrid: '粉格',
        blue: '蓝底',
        creamPaper: '奶油纸',
      },
      frame: {
        softWhite: '圆角白边',
        white: '白边',
        black: '黑边',
        none: '无边',
      },
    },
    polaroid: {
      title: 'Pica Booth',
      subtitle: 'one soft polaroid',
      date: 'today',
      openSlot: '空位',
    },
    strip: {
      title: 'Pica Booth',
      subtitle: 'soft photo strip',
      ready: '已就绪',
      openSlot: '空位',
      waitingShot: '等待拍摄',
      studioGlow: '棚拍氛围',
      shotsCount: '连拍成片',
      stickerSpark: '闪闪',
      stickerBestie: '好友',
      stickerFlash: '闪光',
    },
    lottie: {
      title: '保存氛围',
      description: '拍完后给用户一个轻盈的完成反馈，后续可以换成真实庆祝动效。',
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
        'Phase 02 adds a real camera and four-shot capture while keeping the responsive photo strip and GSAP motion.',
      footerGuardrails:
        'Camera processing stays on this device and photos are never uploaded.',
    },
    flow: {
      lockedStage: 'This stage unlocks after you fill every slot for the selected layout.',
    },
    layout: {
      pageLabel: 'Layout',
      title: 'Choose your layout',
      description:
        'Pick a layout before you start. Shot count and final strip arrangement follow the layout you choose.',
      lockedHint: 'Layout is locked after the first shot. Restart to switch.',
      options: {
        a: { name: 'Layout A', poses: '{{count}} Pose' },
        b: { name: 'Layout B', poses: '{{count}} Pose' },
        c: { name: 'Layout C', poses: '{{count}} Pose' },
        d: { name: 'Layout D', poses: '{{count}} Pose' },
        traditional: { name: 'Traditional Photobooth', poses: '{{count}} Pose Vertical' },
      },
    },
    steps: {
      ariaLabel: 'Photo booth flow',
      start: { label: 'Start', note: 'entry' },
      camera: { label: 'Camera', note: 'live capture' },
      edit: { label: 'Edit', note: 'strip styling' },
      export: { label: 'Export', note: 'save strip' },
    },
    start: {
      badge: 'SELF PHOTO BOOTH',
      eyebrow: 'clean . soft . shareable',
      title: 'Pica Booth',
      description:
        'Your personal photo booth at home. Choose a layout, shoot a strip, add soft filters, and keep everything local in your browser.',
      startButton: 'START',
      metaPill: 'real camera . mobile and desktop . local processing',
      previewTitle: 'Strip preview',
      previewSubtitle: 'soft paper preview',
      stageBadge: '4 cuts',
      petPreviewTitle: 'A little cute energy',
      petPreviewSubtitle: 'Save the camera for you.',
      petPreviewBadge: 'mood board',
      dogAlt: 'A small dog against a pink backdrop',
      catAlt: 'A cat in soft light',
      highlightOneTitle: 'Real four-shot capture',
      highlightOneDescription: 'Camera permission and real snapshots work on mobile, macOS, and Windows browsers.',
      highlightTwoTitle: 'Style before export',
      highlightTwoDescription: 'Soft borders, filters, and stickers tuned for a clean Korean booth feel.',
      highlightThreeTitle: 'Made to share',
      highlightThreeDescription: 'The strip stays central from capture through edit and export.',
    },
    camera: {
      pageLabel: 'Camera page',
      title: 'Allow camera access and start a real multi-shot session.',
      shotCount: '{{count}} / {{total}} shots',
      cameraFeed: 'camera waiting',
      liveFeed: 'live camera',
      livePreview: 'Live camera preview',
      flashReady: 'flash ready',
      currentFrame: 'current frame',
      liveCamera: 'live view',
      lensLooks: 'Lens looks',
      lensHint: 'Original is default. Pick a look before your first shot.',
      lensLocked: 'Lens look is locked for this session.',
      boothMode: 'booth mode',
      captureIn: 'capture in {{count}}',
      readyToSnap: 'ready to snap',
      allShotsCaptured: 'All shots captured',
      takePhoto: 'Take photo',
      capturedTitle: 'Photo {{count}}',
      capturedCaption: 'Captured with your camera',
      enableCamera: 'Enable camera',
      retryCamera: 'Try again',
      switchCamera: 'Switch camera',
      permissionTitle: 'Camera permission needed',
      permissionDescription:
        'Click enable and your browser will request camera access. Video and photos are processed only on this device and are never uploaded.',
      requestingPermission: 'Waiting for browser permission…',
      permissionDenied: 'Camera permission was denied',
      cameraUnavailable: 'No available camera was found',
      cameraBusy: 'The camera is being used by another application',
      insecureContext: 'This page cannot access the camera securely',
      cameraError: 'The camera could not be started',
      permissionHelp: {
        ios: 'Allow camera access for this browser in iPhone/iPad Settings, return here, and try again. The page must be opened over HTTPS.',
        android:
          'Allow camera access in the browser site settings and Android app permissions, then return and try again. The page must use HTTPS.',
        mac: 'Check the site permission in the browser address bar and the browser permission under System Settings → Privacy & Security → Camera.',
        windows:
          'Check the site permission in the browser address bar and browser access under Settings → Privacy & security → Camera.',
        other:
          'Allow camera access in the browser site permissions and device privacy settings, then return and try again.',
      },
      restart: 'Restart',
      continueToEdit: 'Continue to edit',
      sessionStrip: 'Session strip',
      fillSlots: 'fill every slot with real captures',
      previewBadge: 'preview',
      phaseNoteTitle: 'Privacy note',
      phaseNoteBody:
        'Camera video and snapshots are processed only in this browser and are never uploaded. Leaving or refreshing clears this session.',
    },
    edit: {
      pageLabel: 'Edit page',
      title: 'Style the strip before export.',
      polaroidTitle: 'Edit this polaroid.',
      polaroidDescription:
        'Your shots become one polaroid layout. Tune the filter and paper color.',
      description:
        'Choose a soft filter and paper so the strip feels ready to share.',
      borderColorsTitle: 'Border colors',
      borderColorsNote: 'strip shell tones',
      borderPreset: 'border preset',
      filtersTitle: 'Filters',
      filtersNote: 'light photo mood',
      paperTitle: 'Paper color',
      paperNote: 'choose the outer polaroid paper',
      signatureTitle: 'Footer signature',
      signatureNote: 'Leave blank to hide the footer text.',
      signaturePlaceholder: 'e.g. Summer 2026 · Mia & Leo',
      backdropTitle: 'Backdrop',
      backdropNote: 'add a soft base layer',
      frameTitle: 'Frame',
      frameNote: 'white border, black border, or none',
      stickerEntryTitle: 'Sticker entry',
      stickerEntryNote: 'add a small mood tag',
      liveStrip: 'Live strip',
      liveStripSubtitle: 'responsive preview for desktop and mobile',
      mockComposition: 'live preview',
      currentMix: 'Current mix',
      border: 'Border',
      filter: 'Filter',
      stickers: 'Stickers',
      backToCamera: 'Back to camera',
      continueToExport: 'Continue to export',
    },
    export: {
      pageLabel: 'Export page',
      title: 'Review your strip and save the final look.',
      description:
        'The final screen keeps the photo strip front and center so you can check the border, filter, and stickers.',
      finalStrip: 'Final strip',
      finalStripSubtitle: 'ready-to-save preview',
      waiting: 'waiting',
      savedMock: 'saved',
      exportActions: 'Export actions',
      exportActionsDescription:
        'Save the strip, or go back and retake the session.',
      downloadMock: 'Save PNG',
      downloadPng: 'Download PNG',
      shareImage: 'Share image',
      exporting: 'Creating…',
      retake: 'Retake',
      successMessage: 'Your photo strip is ready in downloads or your share destination.',
      errorMessage: 'Could not create the image. Please try again.',
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
      paper: {
        white: 'White',
        cream: 'Cream',
        pink: 'Pink',
        blue: 'Blue',
        black: 'Black',
      },
      backdrop: {
        none: 'None',
        pinkGrid: 'Pink grid',
        blue: 'Blue',
        creamPaper: 'Cream paper',
      },
      frame: {
        softWhite: 'Soft white',
        white: 'White',
        black: 'Black',
        none: 'None',
      },
    },
    polaroid: {
      title: 'Pica Booth',
      subtitle: 'one soft polaroid',
      date: 'today',
      openSlot: 'slot',
    },
    strip: {
      title: 'Pica Booth',
      subtitle: 'soft photo strip',
      ready: 'ready',
      openSlot: 'Open slot',
      waitingShot: 'waiting for shot',
      studioGlow: 'studio glow',
      shotsCount: 'photo strip',
      stickerSpark: 'spark',
      stickerBestie: 'bestie',
      stickerFlash: 'flash',
    },
    lottie: {
      title: 'Save mood',
      description:
        'A soft finish-state moment that can later become a real celebration animation.',
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
