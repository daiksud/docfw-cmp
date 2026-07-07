import type { Locale } from './i18n-config'

export type Dictionary = (typeof import('./en'))['default']

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./en').then(m => m.default),
  ja: () => import('./ja').then(m => m.default)
}

export async function getDictionary(lang: string): Promise<Dictionary> {
  const load = dictionaries[lang as Locale] ?? dictionaries.en
  return load()
}
