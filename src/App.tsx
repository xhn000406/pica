import { House } from 'lucide-react'
import { startTransition, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { PhotoStripPreview } from './components/PhotoStripPreview'
import { StepRail } from './components/StepRail'
import { getMockPhotos } from './data/mockPhotos'
import { CameraPage } from './pages/CameraPage'
import { EditPage } from './pages/EditPage'
import { ExportPage } from './pages/ExportPage'
import { StartPage } from './pages/StartPage'
import { useI18n } from './useI18n'
import type {
  AppPage,
  BorderToneId,
  FilterId,
  StickerId,
} from './types'

const totalShots = 4

function App() {
  const { locale, setLocale, t } = useI18n()
  const shellRef = useRef<HTMLDivElement | null>(null)
  const pageRef = useRef<HTMLDivElement | null>(null)
  const countdownTimerRef = useRef<number | null>(null)
  const flashTimerRef = useRef<number | null>(null)
  const captureTimerRef = useRef<number | null>(null)

  const [page, setPage] = useState<AppPage>('start')
  const [capturedPhotoIndexes, setCapturedPhotoIndexes] = useState<number[]>([])
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const [isCaptureLocked, setIsCaptureLocked] = useState(false)
  const [borderTone, setBorderTone] = useState<BorderToneId>('butter')
  const [filterId, setFilterId] = useState<FilterId>('original')
  const [stickerIds, setStickerIds] = useState<StickerId[]>(['spark', 'date'])
  const [downloadState, setDownloadState] = useState<'idle' | 'success'>('idle')

  const mockPhotos = getMockPhotos(locale)
  const capturedPhotos = capturedPhotoIndexes.map((index) => mockPhotos[index])
  const previewPhotos =
    capturedPhotoIndexes.length === totalShots ? capturedPhotos : mockPhotos
  const livePreviewPhoto =
    mockPhotos[capturedPhotoIndexes.length % mockPhotos.length]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { autoAlpha: 0, y: 24 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.64,
          ease: 'power3.out',
          stagger: 0.08,
          clearProps: 'all',
        },
      )
    }, pageRef)

    return () => ctx.revert()
  }, [page])

  useEffect(() => {
    return () => {
      if (countdownTimerRef.current) {
        window.clearInterval(countdownTimerRef.current)
      }

      if (flashTimerRef.current) {
        window.clearTimeout(flashTimerRef.current)
      }

      if (captureTimerRef.current) {
        window.clearTimeout(captureTimerRef.current)
      }
    }
  }, [])

  const goToPage = (nextPage: AppPage) => {
    startTransition(() => {
      setPage(nextPage)
    })
  }

  const canVisitPage = (targetPage: AppPage) => {
    if (targetPage === 'start' || targetPage === 'camera') {
      return true
    }

    return capturedPhotoIndexes.length === totalShots
  }

  const clearCaptureTimers = () => {
    if (countdownTimerRef.current) {
      window.clearInterval(countdownTimerRef.current)
      countdownTimerRef.current = null
    }

    if (flashTimerRef.current) {
      window.clearTimeout(flashTimerRef.current)
      flashTimerRef.current = null
    }

    if (captureTimerRef.current) {
      window.clearTimeout(captureTimerRef.current)
      captureTimerRef.current = null
    }
  }

  const resetSession = (nextPage: AppPage = 'camera') => {
    clearCaptureTimers()
    setCapturedPhotoIndexes([])
    setCountdown(null)
    setIsFlashing(false)
    setIsCaptureLocked(false)
    setDownloadState('idle')
    goToPage(nextPage)
  }

  const handleCapture = () => {
    if (isCaptureLocked || capturedPhotoIndexes.length >= totalShots) {
      return
    }

    clearCaptureTimers()
    setIsCaptureLocked(true)
    setCountdown(3)

    let nextTick = 3

    countdownTimerRef.current = window.setInterval(() => {
      nextTick -= 1

      if (nextTick > 0) {
        setCountdown(nextTick)
        return
      }

      clearCaptureTimers()
      setCountdown(null)
      setIsFlashing(true)
      setCapturedPhotoIndexes((previous) => [...previous, previous.length])

      flashTimerRef.current = window.setTimeout(() => {
        setIsFlashing(false)
      }, 260)

      captureTimerRef.current = window.setTimeout(() => {
        setIsCaptureLocked(false)
      }, 360)
    }, 760)
  }

  const toggleSticker = (stickerId: StickerId) => {
    setStickerIds((current) =>
      current.includes(stickerId)
        ? current.filter((item) => item !== stickerId)
        : [...current, stickerId],
    )
  }

  const handleMockDownload = () => {
    setDownloadState('success')
  }

  let pageContent: React.ReactNode

  switch (page) {
    case 'camera':
      pageContent = (
        <CameraPage
          capturedPhotos={capturedPhotos}
          livePreviewPhoto={livePreviewPhoto}
          borderTone={borderTone}
          filterId={filterId}
          stickerIds={stickerIds}
          countdown={countdown}
          isFlashing={isFlashing}
          isCaptureLocked={isCaptureLocked}
          onCapture={handleCapture}
          onRestart={() => resetSession('camera')}
          onContinue={() => goToPage('edit')}
        />
      )
      break
    case 'edit':
      pageContent = (
        <EditPage
          photos={capturedPhotos}
          borderTone={borderTone}
          filterId={filterId}
          stickerIds={stickerIds}
          onBorderToneChange={setBorderTone}
          onFilterChange={setFilterId}
          onToggleSticker={toggleSticker}
          onBack={() => goToPage('camera')}
          onContinue={() => goToPage('export')}
        />
      )
      break
    case 'export':
      pageContent = (
        <ExportPage
          photos={capturedPhotos}
          borderTone={borderTone}
          filterId={filterId}
          stickerIds={stickerIds}
          downloadState={downloadState}
          onDownload={handleMockDownload}
          onRetake={() => resetSession('camera')}
        />
      )
      break
    case 'start':
    default:
      pageContent = (
        <StartPage
          previewPhotos={previewPhotos}
          borderTone={borderTone}
          filterId={filterId}
          stickerIds={stickerIds}
          onStart={() => resetSession('camera')}
        />
      )
      break
  }

  return (
    <div ref={shellRef} className="min-h-screen bg-white text-[#111827]">
      <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 bg-white/96 backdrop-blur">
          <div className="flex flex-col gap-4 border-b border-[#edf1f5] py-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0f9d8a] text-white shadow-[0_12px_24px_rgba(15,157,138,0.2)]">
                  <House size={20} />
                </div>
              </div>

              <StepRail
                currentPage={page}
                onSelect={(nextPage) => canVisitPage(nextPage) && goToPage(nextPage)}
                isStepEnabled={canVisitPage}
              />
            </div>

            <div className="flex items-center gap-2 self-start rounded-2xl border border-[#e7ebf0] bg-white p-1 shadow-[0_10px_24px_rgba(15,23,42,0.04)] lg:self-auto">
              <span className="px-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#667085]">
                {t('common.languageSwitch')}
              </span>
              <button
                type="button"
                onClick={() => setLocale('zh-CN')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  locale === 'zh-CN'
                    ? 'bg-[#0f9d8a] text-white'
                    : 'text-[#475467] hover:bg-[#f6f8fb]'
                }`}
              >
                {t('common.chinese')}
              </button>
              <button
                type="button"
                onClick={() => setLocale('en-US')}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  locale === 'en-US'
                    ? 'bg-[#0f9d8a] text-white'
                    : 'text-[#475467] hover:bg-[#f6f8fb]'
                }`}
              >
                {t('common.english')}
              </button>
            </div>
          </div>
        </header>

        <main ref={pageRef} className="flex-1 py-8 lg:py-10">
          <div className="relative">{pageContent}</div>
        </main>

        <footer className="pb-8 pt-2">
          <div className="flex flex-col gap-4 rounded-[28px] border border-[#e7ebf0] bg-[#fbfcfd] px-5 py-5 text-sm text-[#667085] shadow-[0_16px_36px_rgba(15,23,42,0.04)] md:flex-row md:items-center md:justify-between">
            <p>{t('app.footerGuardrails')}</p>

            <PhotoStripPreview
              photos={mockPhotos}
              borderTone={borderTone}
              filterId={filterId}
              stickerIds={stickerIds}
              compact
            />
          </div>
        </footer>
      </div>
    </div>
  )
}

export default App
