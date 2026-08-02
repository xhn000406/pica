import { House } from 'lucide-react'
import { startTransition, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

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
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
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
  const [capturedPhotos, setCapturedPhotos] = useState<MockPhoto[]>([])
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isFlashing, setIsFlashing] = useState(false)
  const [isCaptureLocked, setIsCaptureLocked] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [borderTone] = useState<BorderToneId>('butter')
  const [filterId, setFilterId] = useState<FilterId>('original')
  const [polaroidPaperId, setPolaroidPaperId] = useState<PolaroidPaperId>('white')
  const [polaroidFooterText, setPolaroidFooterText] = useState('')
  const polaroidBackdropId: PolaroidBackdropId = 'none'
  const polaroidFrameId: PolaroidFrameId = 'none'
  const [stickerIds] = useState<StickerId[]>(['spark', 'date'])
  const [downloadState, setDownloadState] = useState<'idle' | 'success'>('idle')

  const mockPhotos = getMockPhotos(locale)
  const previewPhotos =
    capturedPhotos.length === totalShots ? capturedPhotos : mockPhotos
  const livePreviewPhoto =
    mockPhotos[capturedPhotos.length % mockPhotos.length]

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

  useEffect(() => {
    if (!isEditModalOpen) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsEditModalOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isEditModalOpen])

  const goToPage = (nextPage: AppPage) => {
    if (nextPage !== 'edit') {
      setIsEditModalOpen(false)
    }

    startTransition(() => {
      setPage(nextPage)
    })
  }

  const openEditModal = () => {
    if (capturedPhotos.length !== totalShots) {
      return
    }

    setIsEditModalOpen(true)
  }

  const handleStepSelect = (nextPage: AppPage) => {
    if (!canVisitPage(nextPage)) {
      return
    }

    if (nextPage === 'edit') {
      openEditModal()
      return
    }

    goToPage(nextPage)
  }

  const canVisitPage = (targetPage: AppPage) => {
    if (targetPage === 'start' || targetPage === 'camera') {
      return true
    }

    return capturedPhotos.length === totalShots
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
    setCapturedPhotos([])
    setCountdown(null)
    setIsFlashing(false)
    setIsCaptureLocked(false)
    setIsEditModalOpen(false)
    setDownloadState('idle')
    setPolaroidFooterText('')
    goToPage(nextPage)
  }

  const handleCapture = (captureFrame: () => string | null) => {
    if (isCaptureLocked || capturedPhotos.length >= totalShots) {
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
      const capturedSrc = captureFrame()

      if (!capturedSrc) {
        setIsCaptureLocked(false)
        return
      }

      setIsFlashing(true)
      setCapturedPhotos((previous) => {
        const shotNumber = previous.length + 1

        return [
          ...previous,
          {
            id: `camera-shot-${Date.now()}-${shotNumber}`,
            title: t('camera.capturedTitle', { count: shotNumber }),
            caption: t('camera.capturedCaption'),
            src: capturedSrc,
            accent: '#0f9d8a',
          },
        ]
      })

      flashTimerRef.current = window.setTimeout(() => {
        setIsFlashing(false)
      }, 260)

      captureTimerRef.current = window.setTimeout(() => {
        setIsCaptureLocked(false)
      }, 360)
    }, 760)
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
          filterId={filterId}
          countdown={countdown}
          isFlashing={isFlashing}
          isCaptureLocked={isCaptureLocked}
          onCapture={handleCapture}
          onRestart={() => resetSession('camera')}
          onContinue={openEditModal}
        />
      )
      break
    case 'export':
      pageContent = (
        <ExportPage
          photos={capturedPhotos}
          filterId={filterId}
          paperId={polaroidPaperId}
          backdropId={polaroidBackdropId}
          frameId={polaroidFrameId}
          footerText={polaroidFooterText}
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
    <div
      ref={shellRef}
      className="min-h-screen bg-[#fffaf7] text-[#161316] selection:bg-[#ffdce7]"
    >
      <div className="mx-auto flex min-h-screen w-full max-w-[1320px] flex-col px-4 sm:px-6 lg:px-8">
        <header className="sticky top-0 z-20 bg-[#fffaf7]/92 backdrop-blur-xl">
          <div className="flex flex-col gap-4 border-b border-[#f0ded7] py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ead8d1] bg-white text-[#161316] shadow-[0_10px_24px_rgba(120,86,68,0.08)]">
                  <House size={20} />
                </div>
                <div className="hidden leading-none sm:block">
                  <p className="font-heading text-xl text-[#161316]">Pica Booth</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#a77f85]">
                    self studio
                  </p>
                </div>
              </div>

              <StepRail
                currentPage={isEditModalOpen ? 'edit' : page}
                onSelect={handleStepSelect}
                isStepEnabled={canVisitPage}
              />
            </div>

            <div className="flex items-center gap-1 self-start rounded-full border border-[#ead8d1] bg-white/82 p-1 shadow-[0_10px_24px_rgba(120,86,68,0.06)] lg:self-auto">
              <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9b7a7f]">
                {t('common.languageSwitch')}
              </span>
              <button
                type="button"
                onClick={() => setLocale('zh-CN')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === 'zh-CN'
                    ? 'bg-[#161316] text-white'
                    : 'text-[#6f6264] hover:bg-[#fff2f5]'
                }`}
              >
                {t('common.chinese')}
              </button>
              <button
                type="button"
                onClick={() => setLocale('en-US')}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  locale === 'en-US'
                    ? 'bg-[#161316] text-white'
                    : 'text-[#6f6264] hover:bg-[#fff2f5]'
                }`}
              >
                {t('common.english')}
              </button>
            </div>
          </div>
        </header>

        <main ref={pageRef} className="flex-1 py-7 lg:py-10">
          <div className="relative">{pageContent}</div>
        </main>

        <footer className="pb-8 pt-2">
          <div className="flex items-center justify-between border-t border-[#f0ded7] px-1 pt-5 text-xs uppercase tracking-[0.22em] text-[#a4888c]">
            <p>{t('app.footerGuardrails')}</p>
          </div>
        </footer>
      </div>

      {isEditModalOpen ? (
        <div
          className="fixed inset-0 z-40 overflow-y-auto bg-[#161316]/28 px-4 py-6 backdrop-blur-md sm:py-8"
          role="dialog"
          aria-modal="true"
          aria-label={t('edit.polaroidTitle')}
          onClick={() => setIsEditModalOpen(false)}
        >
          <div onClick={(event) => event.stopPropagation()}>
            <EditPage
              photos={capturedPhotos}
              filterId={filterId}
              paperId={polaroidPaperId}
              backdropId={polaroidBackdropId}
              frameId={polaroidFrameId}
              footerText={polaroidFooterText}
              onFilterChange={setFilterId}
              onPaperChange={setPolaroidPaperId}
              onFooterTextChange={setPolaroidFooterText}
              onBack={() => setIsEditModalOpen(false)}
              onContinue={() => {
                setIsEditModalOpen(false)
                goToPage('export')
              }}
            />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default App
