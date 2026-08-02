import { useI18n } from '../useI18n'

export function LottieSlot() {
  const { t } = useI18n()

  return (
    <div className="rounded-[28px] border border-[#ead8d1] bg-[#fff7fb] p-5 text-center shadow-[0_18px_44px_rgba(120,86,68,0.07)]">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-inner">
        <div className="h-10 w-10 rounded-full border-2 border-[#e8a8ba] border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 font-heading text-2xl text-[#161316]">{t('lottie.title')}</p>
      <p className="mt-2 text-sm leading-6 text-[#8a7477]">{t('lottie.description')}</p>
    </div>
  )
}
