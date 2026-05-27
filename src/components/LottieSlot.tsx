import { useI18n } from '../useI18n'

export function LottieSlot() {
  const { t } = useI18n()

  return (
    <div className="rounded-[28px] border border-dashed border-[#d7e0ea] bg-[#fbfcfd] p-5 text-center">
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#ecfffb]">
        <div className="h-10 w-10 rounded-full border-2 border-[#0f9d8a] border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-lg font-semibold text-[#0b0f19]">{t('lottie.title')}</p>
      <p className="mt-2 text-sm leading-6 text-[#667085]">{t('lottie.description')}</p>
    </div>
  )
}
