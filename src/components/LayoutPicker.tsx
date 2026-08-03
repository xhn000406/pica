import { getStripLayout, layoutOrder } from '../data/layouts'
import type { LayoutId } from '../types'
import { useI18n } from '../useI18n'

type LayoutPickerProps = {
  selectedId: LayoutId
  disabled?: boolean
  onSelect: (id: LayoutId) => void
}

function thumbFrameClass(layoutId: LayoutId) {
  switch (layoutId) {
    case 'd':
      return 'aspect-square w-[88px]'
    case 'traditional':
      return 'aspect-[2/5] w-[48px]'
    case 'c':
      return 'aspect-[5/7] w-[78px]'
    case 'b':
      return 'aspect-[5/11] w-[64px]'
    case 'a':
    default:
      return 'aspect-[5/14] w-[60px]'
  }
}

function LayoutThumb({ layoutId }: { layoutId: LayoutId }) {
  const layout = getStripLayout(layoutId)
  const slots = Array.from({ length: layout.shotCount }, (_, index) => index)
  const gap = layoutId === 'traditional' ? 'gap-[3px]' : 'gap-1'

  if (layout.arrangement === 'grid-2x2') {
    return (
      <div className={`grid h-full w-full grid-cols-2 ${gap} p-1.5`}>
        {slots.map((slot) => (
          <div
            key={slot}
            className="min-h-0 rounded-[4px] bg-[linear-gradient(145deg,#ffd6e4_0%,#cfefff_100%)]"
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`flex h-full w-full flex-col ${gap} p-1.5`}>
      {slots.map((slot) => (
        <div
          key={slot}
          className="min-h-0 w-full flex-1 rounded-[4px] bg-[linear-gradient(145deg,#ffd6e4_0%,#cfefff_100%)]"
        />
      ))}
    </div>
  )
}

export function LayoutPicker({ selectedId, disabled = false, onSelect }: LayoutPickerProps) {
  const { t } = useI18n()

  return (
    <section className="rounded-[30px] border border-[#ead8d1] bg-white/70 p-5 shadow-[0_24px_60px_rgba(120,86,68,0.08)]">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c07b91]">
          {t('layout.pageLabel')}
        </p>
        <h2 className="mt-2 font-heading text-3xl text-[#161316] sm:text-4xl">
          {t('layout.title')}
        </h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-[#8a7477]">
          {t('layout.description')}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {layoutOrder.map((layoutId) => {
          const layout = getStripLayout(layoutId)
          const selected = selectedId === layoutId

          return (
            <button
              key={layoutId}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(layoutId)}
              className={`rounded-[24px] border p-3 text-left transition duration-300 disabled:cursor-not-allowed disabled:opacity-55 ${
                selected
                  ? 'border-[#f2a4bc] bg-[#fff5f8] shadow-[0_16px_36px_rgba(198,110,140,0.18)]'
                  : 'border-[#ead8d1] bg-white/80 hover:-translate-y-0.5 hover:bg-[#fffaf7]'
              }`}
            >
              <div className="mb-3 grid h-[148px] place-items-center">
                <div
                  className={`overflow-hidden rounded-[16px] border bg-white ${thumbFrameClass(layoutId)} ${
                    selected ? 'border-[#f2a4bc]' : 'border-[#f0ded7]'
                  }`}
                >
                  <LayoutThumb layoutId={layoutId} />
                </div>
              </div>
              <p className="text-center text-sm font-semibold text-[#161316]">
                {t(`layout.options.${layoutId}.name`)}
              </p>
              <p className="mt-1 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-[#a4888c]">
                {t(`layout.options.${layoutId}.poses`, { count: layout.shotCount })}
              </p>
            </button>
          )
        })}
      </div>
    </section>
  )
}
