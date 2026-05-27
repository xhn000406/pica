import { Palette, Sparkles, Sticker, Undo2 } from 'lucide-react'

import { PhotoStripPreview } from '../components/PhotoStripPreview'
import type {
  BorderToneId,
  FilterId,
  MockPhoto,
  StickerId,
} from '../types'
import { useI18n } from '../useI18n'

type EditPageProps = {
  photos: MockPhoto[]
  borderTone: BorderToneId
  filterId: FilterId
  stickerIds: StickerId[]
  onBorderToneChange: (tone: BorderToneId) => void
  onFilterChange: (filter: FilterId) => void
  onToggleSticker: (stickerId: StickerId) => void
  onBack: () => void
  onContinue: () => void
}

export function EditPage({
  photos,
  borderTone,
  filterId,
  stickerIds,
  onBorderToneChange,
  onFilterChange,
  onToggleSticker,
  onBack,
  onContinue,
}: EditPageProps) {
  const { t } = useI18n()

  const borderOptions: Array<{ id: BorderToneId; label: string; swatch: string }> = [
    { id: 'butter', label: t('options.border.butter'), swatch: '#f6c15d' },
    { id: 'blush', label: t('options.border.blush'), swatch: '#ea7ba0' },
    { id: 'mint', label: t('options.border.mint'), swatch: '#55bc8e' },
    { id: 'midnight', label: t('options.border.midnight'), swatch: '#302d39' },
  ]

  const filterOptions: Array<{ id: FilterId; label: string; note: string }> = [
    {
      id: 'original',
      label: t('options.filter.original.label'),
      note: t('options.filter.original.note'),
    },
    {
      id: 'mono',
      label: t('options.filter.mono.label'),
      note: t('options.filter.mono.note'),
    },
    {
      id: 'sun-kiss',
      label: t('options.filter.sun-kiss.label'),
      note: t('options.filter.sun-kiss.note'),
    },
    {
      id: 'cool-pop',
      label: t('options.filter.cool-pop.label'),
      note: t('options.filter.cool-pop.note'),
    },
  ]

  const stickerOptions: Array<{ id: StickerId; label: string; note: string }> = [
    {
      id: 'spark',
      label: t('options.sticker.spark.label'),
      note: t('options.sticker.spark.note'),
    },
    {
      id: 'bestie',
      label: t('options.sticker.bestie.label'),
      note: t('options.sticker.bestie.note'),
    },
    {
      id: 'date',
      label: t('options.sticker.date.label'),
      note: t('options.sticker.date.note'),
    },
    {
      id: 'flash',
      label: t('options.sticker.flash.label'),
      note: t('options.sticker.flash.note'),
    },
  ]

  const selectedBorder =
    borderOptions.find((option) => option.id === borderTone)?.label ?? borderTone
  const selectedFilter =
    filterOptions.find((option) => option.id === filterId)?.label ?? filterId

  return (
    <div className="grid gap-8 xl:grid-cols-[0.88fr_1.12fr]">
      <aside data-reveal className="space-y-6">
        <div className="rounded-[32px] border border-[#e7ebf0] bg-white p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0f9d8a]">
            {t('edit.pageLabel')}
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#0b0f19]">
            {t('edit.title')}
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#667085]">{t('edit.description')}</p>
        </div>

        <section className="rounded-[32px] border border-[#e7ebf0] bg-[#fbfcfd] p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ecfffb] text-[#0f9d8a]">
              <Palette size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0b0f19]">
                {t('edit.borderColorsTitle')}
              </h2>
              <p className="text-sm text-[#667085]">{t('edit.borderColorsNote')}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {borderOptions.map((option) => {
              const isActive = borderTone === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onBorderToneChange(option.id)}
                  className={`flex items-center gap-3 rounded-[24px] border px-4 py-4 text-left transition duration-300 ${
                    isActive
                      ? 'border-[#111827] bg-white shadow-[0_16px_28px_rgba(15,23,42,0.08)]'
                      : 'border-[#e7ebf0] bg-white hover:bg-[#fcfcfd]'
                  }`}
                >
                  <span
                    className="h-10 w-10 rounded-full border border-black/6"
                    style={{ backgroundColor: option.swatch }}
                  />
                  <span>
                    <span className="block font-semibold text-[#111827]">{option.label}</span>
                    <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[#98a2b3]">
                      {t('edit.borderPreset')}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#e7ebf0] bg-[#fbfcfd] p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f2f7ff] text-[#3b82f6]">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0b0f19]">
                {t('edit.filtersTitle')}
              </h2>
              <p className="text-sm text-[#667085]">{t('edit.filtersNote')}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            {filterOptions.map((option) => {
              const isActive = filterId === option.id

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onFilterChange(option.id)}
                  className={`rounded-[24px] border px-4 py-4 text-left transition duration-300 ${
                    isActive
                      ? 'border-[#111827] bg-white shadow-[0_16px_28px_rgba(15,23,42,0.08)]'
                      : 'border-[#e7ebf0] bg-white hover:bg-[#fcfcfd]'
                  }`}
                >
                  <span className="block font-semibold text-[#111827]">{option.label}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[#98a2b3]">
                    {option.note}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <section className="rounded-[32px] border border-[#e7ebf0] bg-[#fbfcfd] p-6 shadow-[0_18px_36px_rgba(15,23,42,0.04)]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#ecfffb] text-[#0f9d8a]">
              <Sticker size={18} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-[#0b0f19]">
                {t('edit.stickerEntryTitle')}
              </h2>
              <p className="text-sm text-[#667085]">{t('edit.stickerEntryNote')}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {stickerOptions.map((option) => {
              const isActive = stickerIds.includes(option.id)

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onToggleSticker(option.id)}
                  className={`rounded-[24px] border px-4 py-4 text-left transition duration-300 ${
                    isActive
                      ? 'border-[#111827] bg-white shadow-[0_16px_28px_rgba(15,23,42,0.08)]'
                      : 'border-[#e7ebf0] bg-white hover:bg-[#fcfcfd]'
                  }`}
                >
                  <span className="block font-semibold text-[#111827]">{option.label}</span>
                  <span className="mt-1 block text-xs uppercase tracking-[0.18em] text-[#98a2b3]">
                    {option.note}
                  </span>
                </button>
              )
            })}
          </div>
        </section>
      </aside>

      <section data-reveal className="space-y-5">
        <div className="rounded-[36px] border border-[#e7ebf0] bg-white p-6 shadow-[0_20px_40px_rgba(15,23,42,0.06)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-3xl font-semibold tracking-[-0.04em] text-[#0b0f19]">
                {t('edit.liveStrip')}
              </p>
              <p className="mt-1 text-sm text-[#667085]">{t('edit.liveStripSubtitle')}</p>
            </div>
            <div className="rounded-full bg-[#ecfffb] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#0f9d8a]">
              {t('edit.mockComposition')}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[0.62fr_0.38fr] lg:items-start">
            <PhotoStripPreview
              photos={photos}
              borderTone={borderTone}
              filterId={filterId}
              stickerIds={stickerIds}
            />

            <div className="rounded-[28px] border border-[#e7ebf0] bg-[#fbfcfd] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f9d8a]">
                {t('edit.currentMix')}
              </p>
              <dl className="mt-4 space-y-4 text-sm text-[#667085]">
                <div className="flex items-center justify-between gap-4 border-b border-[#edf1f5] pb-3">
                  <dt>{t('edit.border')}</dt>
                  <dd className="font-semibold text-[#111827]">{selectedBorder}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-[#edf1f5] pb-3">
                  <dt>{t('edit.filter')}</dt>
                  <dd className="font-semibold text-[#111827]">{selectedFilter}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 pb-1">
                  <dt>{t('edit.stickers')}</dt>
                  <dd className="font-semibold text-[#111827]">{stickerIds.length}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-3 rounded-2xl border border-[#e7ebf0] bg-white px-6 py-4 text-sm font-semibold text-[#475467] transition duration-300 hover:-translate-y-0.5 hover:bg-[#f9fafb]"
          >
            <Undo2 size={18} />
            {t('edit.backToCamera')}
          </button>

          <button
            type="button"
            onClick={onContinue}
            className="rounded-2xl bg-[#0f9d8a] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#0b8a79]"
          >
            {t('edit.continueToExport')}
          </button>
        </div>
      </section>
    </div>
  )
}
