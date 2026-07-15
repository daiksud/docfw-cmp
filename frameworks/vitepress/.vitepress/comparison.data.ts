import { createContentLoader, type ContentData } from 'vitepress'

const locales = ['en', 'ja'] as const

export type ComparisonLocale = (typeof locales)[number]

export interface ComparisonPageMetadata {
  locale: ComparisonLocale
  url: string
  title?: string
  description?: string
  criteria: string[]
}

export interface LocaleComparisonSummary {
  pageCount: number
  criteria: string[]
}

export interface ComparisonData {
  pageCount: number
  criteria: string[]
  locales: Record<ComparisonLocale, LocaleComparisonSummary>
  pages: ComparisonPageMetadata[]
}

const compareText = (left: string, right: string) =>
  left < right ? -1 : left > right ? 1 : 0

function text(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined
}

function criteria(value: unknown): string[] {
  const values = Array.isArray(value) ? value : [value]

  return [...new Set(values.map(text).filter((item): item is string => Boolean(item)))].sort(
    compareText
  )
}

function localeFromUrl(url: string): ComparisonLocale {
  return url === '/ja/' || url.startsWith('/ja/') ? 'ja' : 'en'
}

function toPageMetadata(page: ContentData): ComparisonPageMetadata {
  const { frontmatter } = page
  const title = text(frontmatter.title)
  const description = text(frontmatter.description)

  return {
    locale: localeFromUrl(page.url),
    url: page.url,
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    criteria: criteria(frontmatter.criteria)
  }
}

function summaryFor(
  pages: ComparisonPageMetadata[],
  locale: ComparisonLocale
): LocaleComparisonSummary {
  const localePages = pages.filter((page) => page.locale === locale)

  return {
    pageCount: localePages.length,
    criteria: [...new Set(localePages.flatMap((page) => page.criteria))].sort(compareText)
  }
}

export default createContentLoader<ComparisonData>(
  ['en/criteria/**/*.md', 'ja/criteria/**/*.md'],
  {
    render: false,
    transform(rawPages) {
      const pages = rawPages
        .map(toPageMetadata)
        .filter((page) => page.criteria.length > 0)
        .sort((left, right) => compareText(left.url, right.url))

      return {
        pageCount: pages.length,
        criteria: [...new Set(pages.flatMap((page) => page.criteria))].sort(compareText),
        locales: {
          en: summaryFor(pages, 'en'),
          ja: summaryFor(pages, 'ja')
        },
        pages
      }
    }
  }
)
