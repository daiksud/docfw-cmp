export const i18n = {
  locales: ['en', 'ja'],
  defaultLocale: 'en'
} as const

export type Locale = (typeof i18n)['locales'][number]

const rtlLocales: readonly string[] = []

export function getDirection(lang: string): 'ltr' | 'rtl' {
  return rtlLocales.includes(lang) ? 'rtl' : 'ltr'
}
