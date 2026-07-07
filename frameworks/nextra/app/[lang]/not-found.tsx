'use client'

import { usePathname } from 'next/navigation'
import { NotFoundPage } from 'nextra-theme-docs'
import type { FC } from 'react'
import en from '../_dictionaries/en'
import { i18n, type Locale } from '../_dictionaries/i18n-config'
import ja from '../_dictionaries/ja'

const dictionaries: Record<Locale, typeof en> = { en, ja }

// `not-found` doesn't receive route `params`, so the locale is derived from
// the current URL instead (e.g. `/ja/broken/link` -> `ja`).
function getLangFromPathname(pathname: string): Locale {
  const [, segment] = pathname.split('/')
  return (i18n.locales as readonly string[]).includes(segment)
    ? (segment as Locale)
    : i18n.defaultLocale
}

const NotFound: FC = () => {
  const pathname = usePathname()
  const dictionary = dictionaries[getLangFromPathname(pathname)]

  return (
    <NotFoundPage content={dictionary.notFound.link}>
      <h1 className="x:text-3xl x:font-bold">{dictionary.notFound.title}</h1>
    </NotFoundPage>
  )
}

export default NotFound
