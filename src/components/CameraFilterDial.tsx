import { cameraFilterOrder, getCameraFilter } from '../data/cameraFilters'
import type { CameraFilterId } from '../types'

type CameraFilterDialProps = {
  value: CameraFilterId
  disabled: boolean
  onChange: (filterId: CameraFilterId) => void
}

export function CameraFilterDial({ value, disabled, onChange }: CameraFilterDialProps) {
  return (
    <div className="-mx-1 overflow-x-auto px-1 pb-2" aria-label="Camera lens looks">
      <div className="flex min-w-max gap-2">
        {cameraFilterOrder.map((filterId) => {
          const filter = getCameraFilter(filterId)
          const isActive = value === filterId

          return (
            <button
              key={filterId}
              type="button"
              aria-pressed={isActive}
              disabled={disabled}
              onClick={() => onChange(filterId)}
              className={`group flex min-w-[92px] items-center gap-2 rounded-2xl border px-3 py-2.5 text-left transition disabled:cursor-not-allowed disabled:opacity-55 ${
                isActive
                  ? 'border-[#161316] bg-[#161316] text-white shadow-[0_12px_25px_rgba(22,19,22,0.18)]'
                  : 'border-[#ead8d1] bg-white/82 text-[#5f4d51] hover:-translate-y-0.5 hover:border-[#c07b91]'
              }`}
            >
              <span
                className="h-7 w-7 shrink-0 rounded-full border border-black/10 shadow-inner"
                style={{ background: filter.swatch }}
              />
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] opacity-70">
                  {filter.shortLabel}
                </span>
                <span className="mt-0.5 block text-xs font-semibold">{filter.label}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
