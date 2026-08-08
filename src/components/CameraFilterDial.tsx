import { cameraFilterOrder, getCameraFilter, type CameraFilterPreset } from '../data/cameraFilters'
import type { CameraFilterId } from '../types'

type CameraFilterDialProps = {
  value: CameraFilterId
  disabled: boolean
  onChange: (filterId: CameraFilterId) => void
}

export function CameraFilterDial({ value, disabled, onChange }: CameraFilterDialProps) {
  return (
    <div className="overflow-hidden rounded-[26px] bg-[#080808] p-3 text-white shadow-[0_18px_36px_rgba(22,19,22,0.18)] sm:p-4" aria-label="Camera lens looks">
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/48">Camera Shelf</span>
        <span className="rounded-full border border-white/14 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white/64">{cameraFilterOrder.length} models</span>
      </div>
      <div className="grid grid-cols-3 gap-x-1 gap-y-3 sm:grid-cols-6">
        {cameraFilterOrder.map((filterId) => {
          const filter = getCameraFilter(filterId)
          const isActive = value === filterId

          return (
            <button
              key={filterId}
              type="button"
              aria-label={`Select ${filter.label} camera look`}
              aria-pressed={isActive}
              disabled={disabled}
              onClick={() => onChange(filterId)}
              className={`group flex min-w-0 flex-col rounded-[18px] px-1 py-2 text-center transition disabled:cursor-not-allowed disabled:opacity-55 ${
                isActive
                  ? 'bg-white/12 text-white shadow-[0_10px_22px_rgba(0,0,0,0.28)]'
                  : 'text-white/82 hover:-translate-y-0.5 hover:bg-white/7'
              }`}
            >
              <CameraModelIcon filter={filter} />
              <span className="mt-2 block truncate text-sm font-bold tracking-[-0.03em]">{filter.label}</span>
              <span className="mt-1 block truncate text-[8px] font-semibold uppercase tracking-[0.1em] text-white/44">
                {filter.model}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function CameraModelIcon({ filter }: { filter: CameraFilterPreset }) {
  const modelArt: Partial<Record<CameraFilterPreset['id'], string>> = {
    fxn: '/camera-model-fxn.png',
    grd: '/camera-model-grd.png',
    fqs: '/camera-model-fqs.png',
    'd-funs': '/camera-model-d-funs.png',
    'classic-u': '/camera-model-classic-u.png',
  }

  if (filter.id !== 'original') {
    return (
      <span
        aria-hidden="true"
        className="flex h-[86px] w-full items-center justify-center overflow-hidden rounded-xl bg-[#090909]"
      >
        <img
          src={modelArt[filter.id]}
          alt=""
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.05]"
        />
      </span>
    )
  }

  const kindClasses: Record<CameraFilterPreset['cameraKind'], string> = {
    phone: 'h-[62px] w-[46px] rounded-[11px]',
    rangefinder: 'h-[48px] w-[76px] rounded-[9px]',
    compact: 'h-[46px] w-[64px] rounded-[12px]',
    instant: 'h-[54px] w-[58px] rounded-[8px]',
    cine: 'h-[54px] w-[63px] rounded-[8px]',
    retro: 'h-[50px] w-[62px] rounded-[7px]',
  }

  return (
    <span className="relative flex h-[86px] items-center justify-center" aria-hidden="true">
      <span
        className={`relative block border border-white/24 shadow-[inset_0_2px_rgba(255,255,255,0.4),0_7px_12px_rgba(0,0,0,0.36)] ${kindClasses[filter.cameraKind]}`}
        style={{ background: filter.swatch }}
      >
        {filter.cameraKind === 'phone' ? <span className="absolute inset-[5px] rounded-[7px] bg-[#17171a] shadow-inner"><span className="absolute left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-[#55545a] bg-[#0b0b0c]" /><span className="absolute right-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-[#55545a] bg-[#0b0b0c]" /><span className="absolute left-1.5 top-6 h-3 w-3 rounded-full border-2 border-[#55545a] bg-[#0b0b0c]" /></span> : null}
      </span>
    </span>
  )
}
