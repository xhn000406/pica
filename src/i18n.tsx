import { useEffect, useState, type ReactNode } from 'react'

import { I18nContext } from './i18n-context'
import {
  getMessage,
  localeStorageKey,
  resolveInitialLocale,
} from './locales'
import type { AppLocale } from './types'

type TranslateValues = Record<string, string | number>

function interpolate(template: string, values?: TranslateValues) {
  if (!values) {
    return template
  }

  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    const value = values[key]
    return value === undefined ? '' : String(value)
  })
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<AppLocale>(() => resolveInitialLocale())

  useEffect(() => {
    window.localStorage.setItem(localeStorageKey, locale)
    document.documentElement.lang = locale
  }, [locale])

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: (path, values) => interpolate(getMessage(locale, path), values),
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}
