import { Palette, Sparkles, Undo2 } from 'lucide-react'
import type { ReactNode } from 'react'

import { PolaroidPreview } from '../components/PolaroidPreview'
import type {
  FilterId,
  MockPhoto,
  PolaroidBackdropId,
  PolaroidFrameId,
  PolaroidPaperId,
} from '../types'
import { useI18n } from '../useI18n'

type EditPageProps = {
  photos: MockPhoto[]
  filterId: FilterId
  paperId: PolaroidPaperId
  backdropId: PolaroidBackdropId
  frameId: PolaroidFrameId
  footerText: string
  onFilterChange: (filter: FilterId) => void
  onPaperChange: (paperId: PolaroidPaperId) => void
  onFooterTextChange: (footerText: string) => void
  onBack: () => void
  onContinue: () => void
}

const paperSwatches: Record<PolaroidPaperId, string> = {
  white: '#ffffff',
  cream: '#fff7e7',
  pink: '#ffe4ed',
  blue: '#dff4ff',
  black: '#161316',
}

export function EditPage({
  photos,
  filterId,
  paperId,
  backdropId,
  frameId,
  footerText,
  onFilterChange,
  onPaperChange,
  onFooterTextChange,
  onBack,
  onContinue,
}: EditPageProps) {
  const { t } = useI18n()

  const filterOptions: Array<{ id: FilterId; label: string; note: string }> = [
    {
      id: 'original',
      label: t('options.filter.original.label'),
      note: t('options.filter.original.note'),
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
    {
      id: 'mono',
      label: t('options.filter.mono.label'),
      note: t('options.filter.mono.note'),
    },
  ]

  const paperOptions: Array<{ id: PolaroidPaperId; label: string }> = [
    { id: 'white', label: t('options.paper.white') },
    { id: 'cream', label: t('options.paper.cream') },
    { id: 'pink', label: t('options.paper.pink') },
    { id: 'blue', label: t('options.paper.blue') },
    { id: 'black', label: t('options.paper.black') },
  ]

  return (
    <div data-reveal className="mx-auto max-w-[1180px]">
      <div className="rounded-[34px] border border-[#ead8d1] bg-white p-4 shadow-[0_34px_100px_rgba(120,86,68,0.18)] sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,0.95fr)]">
          <section className="rounded-[28px] bg-[#fffaf7] px-4 py-6 sm:px-6">
            <div className="mb-5">
              <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[#c07b91]">
                {t('edit.pageLabel')}
              </p>
              <h1 className="mt-2 font-heading text-5xl leading-none text-[#161316]">
                {t('edit.polaroidTitle')}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#8a7477]">
                {t('edit.polaroidDescription')}
              </p>
            </div>

            <PolaroidPreview
              photos={photos}
              filterId={filterId}
              paperId={paperId}
              backdropId={backdropId}
              frameId={frameId}
              footerText={footerText}
              compact
            />
          </section>

          <aside className="space-y-4 rounded-[28px] border border-[#f0ded7] bg-[#fffaf7]/80 p-4 sm:p-5">
            <EditorGroup
              icon={<Sparkles size={17} />}
              title={t('edit.filtersTitle')}
              note={t('edit.filtersNote')}
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onFilterChange(option.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      filterId === option.id
                        ? 'border-[#161316] bg-white shadow-[0_12px_24px_rgba(120,86,68,0.1)]'
                        : 'border-[#ead8d1] bg-white/70 hover:bg-[#fff3f6]'
                    }`}
                  >
                    <span className="block text-sm font-semibold text-[#161316]">
                      {option.label}
                    </span>
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.16em] text-[#a4888c]">
                      {option.note}
                    </span>
                  </button>
                ))}
              </div>
            </EditorGroup>

            <EditorGroup
              icon={<Palette size={17} />}
              title={t('edit.signatureTitle')}
              note={t('edit.signatureNote')}
            >
              <input
                type="text"
                value={footerText}
                onChange={(event) => onFooterTextChange(event.target.value.slice(0, 32))}
                placeholder={t('edit.signaturePlaceholder')}
                className="w-full rounded-2xl border border-[#ead8d1] bg-white px-4 py-3 text-sm font-semibold text-[#161316] outline-none transition placeholder:text-[#b9a6aa] focus:border-[#161316]"
              />
            </EditorGroup>

            <EditorGroup
              icon={<Palette size={17} />}
              title={t('edit.paperTitle')}
              note={t('edit.paperNote')}
            >
              <div className="grid gap-2 sm:grid-cols-5">
                {paperOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => onPaperChange(option.id)}
                    className={`rounded-2xl border p-3 text-center text-xs font-semibold transition ${
                      paperId === option.id
                        ? 'border-[#161316] bg-white'
                        : 'border-[#ead8d1] bg-white/70 hover:bg-[#fff3f6]'
                    }`}
                  >
                    <span
                      className="mx-auto mb-2 block h-7 w-7 rounded-full border border-black/10"
                      style={{ backgroundColor: paperSwatches[option.id] }}
                    />
                    {option.label}
                  </button>
                ))}
              </div>
            </EditorGroup>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-3 rounded-full border border-[#ead8d1] bg-white px-5 py-3 text-sm font-semibold text-[#756467] transition hover:-translate-y-0.5 hover:bg-[#fff3f6]"
              >
                <Undo2 size={18} />
                {t('edit.backToCamera')}
              </button>

              <button
                type="button"
                onClick={onContinue}
                className="rounded-full bg-[#161316] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_38px_rgba(22,19,22,0.18)] transition hover:-translate-y-0.5 hover:bg-[#2b2529]"
              >
                {t('edit.continueToExport')}
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

function EditorGroup({
  icon,
  title,
  note,
  children,
}: {
  icon: ReactNode
  title: string
  note: string
  children: ReactNode
}) {
  return (
    <section className="rounded-[24px] border border-[#ead8d1] bg-white/62 p-4">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#ffe5ed] text-[#c05f7d]">
          {icon}
        </div>
        <div>
          <h2 className="text-base font-semibold text-[#161316]">{title}</h2>
          <p className="text-xs text-[#8a7477]">{note}</p>
        </div>
      </div>
      {children}
    </section>
  )
}
