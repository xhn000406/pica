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
      className="flex w-full flex-nowrap items-center gap-2 overflow-x-auto rounded-2xl border border-[#e7ebf0] bg-[#fbfcfd] p-2 shadow-[0_10px_24px_rgba(15,23,42,0.04)] lg:w-[620px] lg:max-w-[620px] lg:overflow-visible"
    >
      {stepIds.map((stepId, index) => {
        const isActive = currentPage === stepId
        const isEnabled = isStepEnabled(stepId)

        return (
          <button
            key={stepId}
            type="button"
            onClick={() => isEnabled && onSelect(stepId)}
            className={`group flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-left transition duration-300 lg:min-w-0 lg:flex-1 ${
              isActive
                ? 'bg-[#111827] text-white'
                : isEnabled
                  ? 'text-[#475467] hover:bg-white'
                  : 'cursor-not-allowed text-[#b0b8c4]'
            }`}
            aria-current={isActive ? 'page' : undefined}
            disabled={!isEnabled}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold tracking-[0.18em] ${
                isActive
                  ? 'border-white/35 bg-white/12'
                  : 'border-current/15 bg-white'
              }`}
            >
              0{index + 1}
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block font-semibold">{t(`steps.${stepId}.label`)}</span>
              <span
                className={`block text-[11px] uppercase tracking-[0.18em] ${
                  isActive ? 'text-white/70' : 'text-current/60'
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
