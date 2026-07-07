import type { Metadata } from 'next'
import { Footer, Layout, LocaleSwitch, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import type { FC, ReactNode } from 'react'
import { getDictionary } from '../_dictionaries/get-dictionary'
import { getDirection } from '../_dictionaries/i18n-config'
import 'nextra-theme-docs/style.css'
import 'katex/dist/katex.css'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Nextra — Document Framework Comparison',
    template: '%s | Nextra docfw-cmp'
  },
  description:
    'Nextra evaluation for the docfw-cmp document framework comparison project.'
}

const docsRepositoryBase =
  'https://github.com/daiksud/docfw-cmp/tree/main/frameworks/nextra'

type LayoutProps = Readonly<{
  children: ReactNode
  params: Promise<{ lang: string }>
}>

const RootLayout: FC<LayoutProps> = async ({ children, params }) => {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const pageMap = await getPageMap(`/${lang}`)

  const banner = (
    <Banner storageKey="docfw-cmp-nextra-banner">{dictionary.banner}</Banner>
  )

  const navbar = (
    <Navbar
      logo={
        <span>
          <b>Nextra</b>{' '}
          <span style={{ opacity: '60%' }}>{dictionary.logo.title}</span>
        </span>
      }
      // Without this, the logo defaults to `href="/"` (-> `/docfw-cmp/nextra`
      // after basePath), which has no matching route in the `[lang]` catch-all
      // (every real route requires a locale segment). Next.js's <Link>
      // auto-prefetches that href on every page and 404s. Point it at the
      // current locale's home instead.
      logoLink={`/${lang}`}
      projectLink={docsRepositoryBase}
    >
      <LocaleSwitch />
    </Navbar>
  )

  const footer = (
    <Footer>MIT {new Date().getFullYear()} © docfw-cmp.</Footer>
  )

  return (
    <html lang={lang} dir={getDirection(lang)} suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          footer={footer}
          editLink={dictionary.editPage}
          docsRepositoryBase={docsRepositoryBase}
          copyPageButton={false}
          feedback={{ content: null }}
          search={
            <Search
              placeholder={dictionary.search.placeholder}
              emptyResult={dictionary.search.emptyResult}
              errorText={dictionary.search.errorText}
              loading={dictionary.search.loading}
            />
          }
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'ja', name: '日本語' }
          ]}
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true }}
          toc={{ title: dictionary.tocTitle, backToTop: dictionary.backToTop }}
          themeSwitch={{
            dark: dictionary.dark,
            light: dictionary.light,
            system: dictionary.system
          }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}

export default RootLayout
