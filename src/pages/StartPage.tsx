import { useI18n } from '../useI18n'

type StartPageProps = {
  onStart: () => void
}

const stripFrames = [
  {
    src: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=720&q=82',
    altKey: 'start.dogAlt' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=720&q=82',
    altKey: 'start.catAlt' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=720&q=82',
    altKey: 'start.catAlt' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=720&q=82',
    altKey: 'start.dogAlt' as const,
  },
]

export function StartPage({ onStart }: StartPageProps) {
  const { t } = useI18n()

  return (
    <section className="relative isolate overflow-hidden rounded-[36px] px-4 py-10 sm:px-8 sm:py-14 lg:py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_#ffe8ef_0%,_#fff6f8_42%,_#fffaf7_78%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[18%] -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[#ffd6e4]/45 blur-3xl"
      />

      <div className="mx-auto flex min-h-[calc(100vh-220px)] max-w-[720px] flex-col items-center justify-center text-center">
        <div data-reveal className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em] text-[#c07b91]">
            {t('start.badge')}
          </p>
          <h1 className="font-heading text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.05] tracking-[-0.03em] text-[#161316]">
            {t('start.title')}
          </h1>
          <p className="mx-auto max-w-[34rem] text-base leading-7 text-[#7d666a] sm:text-lg sm:leading-8">
            {t('start.description')}
          </p>
        </div>

        <div
          data-reveal
          className="mt-10 animate-[heroBob_4.8s_ease-in-out_infinite] sm:mt-12"
        >
          <div className="mx-auto w-[min(100%,220px)] rounded-[28px] border border-[#d7e0f2] bg-[#e8eefc] p-3 shadow-[0_28px_70px_rgba(120,86,110,0.16)] sm:w-[240px] sm:p-3.5">
            <div className="space-y-2.5 rounded-[20px] bg-white p-2.5">
              {stripFrames.map((frame, index) => (
                <figure
                  key={`${frame.src}-${index}`}
                  className="overflow-hidden rounded-[12px] bg-[#f6ebe6]"
                  style={{ animationDelay: `${index * 120}ms` }}
                >
                  <img
                    src={frame.src}
                    alt={t(frame.altKey)}
                    className="aspect-square w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal className="mt-10 sm:mt-12">
          <button
            type="button"
            onClick={onStart}
            className="inline-flex min-w-[168px] items-center justify-center rounded-full border border-[#161316] bg-[#ffd6e4] px-10 py-3.5 text-base font-semibold tracking-[0.08em] text-[#161316] shadow-[0_14px_34px_rgba(198,110,140,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#ffc8db]"
          >
            {t('start.startButton')}
          </button>
        </div>
      </div>
    </section>
  )
}
