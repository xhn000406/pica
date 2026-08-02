import type { AppPage } from '../types'
import { useI18n } from '../useI18n'

type StepRailProps = {
  currentPage: AppPage
  onSelect: (page: AppPage) => void
  isStepEnabled: (page: AppPage) => boolean
}

const stepIds: AppPage[] = ['start', 'camera', 'edit', 'export']

export function StepRail({
  currentPage,
  onSelect,
  isStepEnabled,
}: StepRailProps) {
  const { t } = useI18n()

  return (
    <nav
      aria-label={t('steps.ariaLabel')}
      className="flex w-full flex-nowrap items-center gap-1 overflow-x-auto rounded-full border border-[#ead8d1] bg-white/76 p-1.5 shadow-[0_14px_32px_rgba(120,86,68,0.07)] lg:w-[620px] lg:max-w-[620px] lg:overflow-visible"
    >
      {stepIds.map((stepId, index) => {
        const isActive = currentPage === stepId
        const isEnabled = isStepEnabled(stepId)

        return (
          <button
            key={stepId}
            type="button"
            onClick={() => isEnabled && onSelect(stepId)}
            className={`group flex shrink-0 items-center gap-3 rounded-full px-3 py-2 text-left transition duration-300 lg:min-w-0 lg:flex-1 ${
              isActive
                ? 'bg-[#161316] text-white shadow-[0_10px_22px_rgba(22,19,22,0.16)]'
                : isEnabled
                  ? 'text-[#756467] hover:bg-[#fff3f6]'
                  : 'cursor-not-allowed text-[#cabdc0]'
            }`}
            aria-current={isActive ? 'page' : undefined}
            disabled={!isEnabled}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold tracking-[0.18em] ${
                isActive
                ? 'border-white/35 bg-white/12'
                : 'border-[#ead8d1] bg-white'
              }`}
            >
              0{index + 1}
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block font-semibold">{t(`steps.${stepId}.label`)}</span>
              <span
                className={`block text-[11px] uppercase tracking-[0.18em] ${
                  isActive ? 'text-white/70' : 'text-current/55'
                }`}
              >
                {t(`steps.${stepId}.note`)}
              </span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}
