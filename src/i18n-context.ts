import { createContext } from 'react'

import type { AppLocale } from './types'

type TranslateValues = Record<string, string | number>

export type I18nContextValue = {
  locale: AppLocale
  setLocale: (locale: AppLocale) => void
  t: (path: string, values?: TranslateValues) => string
}

export const I18nContext = createContext<I18nContextValue | null>(null)
