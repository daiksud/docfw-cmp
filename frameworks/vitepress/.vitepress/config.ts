import { defineConfig } from 'vitepress'
import type { Sidebar, SidebarItem, SidebarMulti } from 'vitepress-sidebar/types'
import footnote from 'markdown-it-footnote'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { withSidebar } from 'vitepress-sidebar'

const repositoryUrl =
  'https://github.com/daiksud/docfw-cmp/tree/main/frameworks/vitepress'
const editLinkPattern =
  'https://github.com/daiksud/docfw-cmp/edit/main/frameworks/vitepress/docs/:path'

// Nextra exports every page as a directory index (`route/index.html`). Map
// VitePress leaf sources to the same public URL shape so changing only the
// framework segment in a deployed URL opens the corresponding page.
const toDirectoryRoute = (id: string) =>
  id === 'index.md' || id.endsWith('/index.md')
    ? id
    : id.replace(/\.md$/, '/index.md')

function directorySidebarLink(link: string): string {
  if (/^(?:[a-z]+:|#)/i.test(link)) return link

  const relative = link.replace(/^\.\//, '').replace(/^\//, '')
  const withoutIndex =
    relative === 'index.md' ? '' : relative.replace(/index\.md$/, '')
  const directory =
    withoutIndex === '' || withoutIndex.endsWith('/')
      ? withoutIndex
      : `${withoutIndex}/`

  // Sidebar groups already carry their locale base (`/en/` or `/ja/`). Keep
  // item links relative or VitePress will prepend that base a second time.
  return directory || '/'
}

function directorySidebarItem(base: string, item: SidebarItem): SidebarItem {
  const isCriteriaOverview = item.link === 'criteria/'

  return {
    ...item,
    ...(isCriteriaOverview
      ? { text: base === '/ja/' ? '概要' : 'Overview' }
      : {}),
    ...(item.link ? { link: directorySidebarLink(item.link) } : {}),
    ...(item.items
      ? { items: item.items.map((child) => directorySidebarItem(base, child)) }
      : {})
  }
}

function directorySidebar(sidebar: Sidebar): Sidebar {
  if (Array.isArray(sidebar)) {
    return sidebar.map((item) => directorySidebarItem('/', item))
  }

  return Object.fromEntries(
    Object.entries(sidebar as SidebarMulti).map(([route, group]) => [
      route,
      {
        ...group,
        items: group.items.map((item) => directorySidebarItem(group.base, item))
      }
    ])
  )
}

const englishSearch = {
  button: {
    buttonText: 'Search',
    buttonAriaLabel: 'Search documentation'
  },
  modal: {
    displayDetails: 'Display detailed list',
    resetButtonTitle: 'Reset search',
    backButtonTitle: 'Back to search',
    noResultsText: 'No results for',
    footer: {
      selectText: 'to select',
      selectKeyAriaLabel: 'enter',
      navigateText: 'to navigate',
      navigateUpKeyAriaLabel: 'up arrow',
      navigateDownKeyAriaLabel: 'down arrow',
      closeText: 'to close',
      closeKeyAriaLabel: 'escape'
    }
  }
}

const japaneseSearch = {
  button: {
    buttonText: '検索',
    buttonAriaLabel: 'ドキュメントを検索'
  },
  modal: {
    displayDetails: '詳細な一覧を表示',
    resetButtonTitle: '検索をリセット',
    backButtonTitle: '検索に戻る',
    noResultsText: '検索結果はありません:',
    footer: {
      selectText: '選択',
      selectKeyAriaLabel: 'Enter',
      navigateText: '移動',
      navigateUpKeyAriaLabel: '上矢印',
      navigateDownKeyAriaLabel: '下矢印',
      closeText: '閉じる',
      closeKeyAriaLabel: 'Escape'
    }
  }
}

const sidebarOptions = ['en', 'ja'].map((locale) => ({
  documentRootPath: `/docs/${locale}`,
  resolvePath: `/${locale}/`,
  basePath: `/${locale}/`,
  includeRootIndexFile: true,
  includeFolderIndexFile: true,
  useFolderTitleFromIndexFile: true,
  // Keep the folder as a section and its index as the single "Overview"
  // child, matching Nextra's generated navigation.
  useFolderLinkFromIndexFile: false,
  useTitleFromFrontmatter: true,
  frontmatterTitleFieldName: 'title',
  sortMenusByFrontmatterOrder: true,
  frontmatterOrderDefaultValue: Number.MAX_SAFE_INTEGER,
  excludeByGlobPattern: ['**/.gitkeep', '**/README.md', '**/_*/**'],
  excludeFilesByFrontmatterFieldName: 'sidebarExclude'
}))

const config = withSidebar(
  withMermaid(
    defineConfig({
      base: '/docfw-cmp/vitepress/',
      srcDir: 'docs',
      cleanUrls: true,
      rewrites: toDirectoryRoute,
      title: 'DocFW Comparison',
      description: 'A bilingual comparison of documentation frameworks.',
      appearance: true,
      lastUpdated: true,
      markdown: {
        math: true,
        config: (md) => {
          md.use(footnote)
        },
        theme: {
          light: 'github-light',
          dark: 'github-dark'
        }
      },
      mermaid: {
        theme: 'neutral',
        securityLevel: 'strict',
        startOnLoad: false,
        fontFamily: 'var(--vp-font-family-base)'
      },
      themeConfig: {
        siteTitle: 'docfw-cmp',
        logoLink: { link: '/docfw-cmp/', target: '_self' },
        outline: {
          level: [2, 3],
          label: 'On this page'
        },
        lastUpdated: {
          text: 'Last updated',
          formatOptions: {
            dateStyle: 'medium'
          }
        },
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        editLink: {
          pattern: editLinkPattern,
          text: 'Edit this page on GitHub'
        },
        socialLinks: [{ icon: 'github', link: repositoryUrl }],
        darkModeSwitchLabel: 'Appearance',
        lightModeSwitchTitle: 'Switch to light theme',
        darkModeSwitchTitle: 'Switch to dark theme',
        sidebarMenuLabel: 'Menu',
        langMenuLabel: 'Change language',
        search: {
          provider: 'local',
          options: {
            translations: englishSearch,
            locales: {
              ja: {
                translations: japaneseSearch
              }
            }
          }
        }
      },
      locales: {
        en: {
          label: 'English',
          lang: 'en-US',
          link: '/en/',
          title: 'DocFW Comparison',
          description: 'A bilingual comparison of documentation frameworks.',
          themeConfig: {
            siteTitle: 'docfw-cmp',
            logoLink: { link: '/docfw-cmp/', target: '_self' },
            outline: {
              level: [2, 3],
              label: 'On this page'
            },
            lastUpdated: {
              text: 'Last updated',
              formatOptions: {
                dateStyle: 'medium'
              }
            },
            docFooter: {
              prev: 'Previous page',
              next: 'Next page'
            },
            editLink: {
              pattern: editLinkPattern,
              text: 'Edit this page on GitHub'
            },
            darkModeSwitchLabel: 'Appearance',
            lightModeSwitchTitle: 'Switch to light theme',
            darkModeSwitchTitle: 'Switch to dark theme',
            sidebarMenuLabel: 'Menu',
            langMenuLabel: 'Change language'
          }
        },
        ja: {
          label: '日本語',
          lang: 'ja-JP',
          link: '/ja/',
          title: 'DocFW 比較',
          description: 'ドキュメントフレームワークを比較するバイリンガルサイトです。',
          themeConfig: {
            siteTitle: 'docfw-cmp',
            logoLink: { link: '/docfw-cmp/', target: '_self' },
            outline: {
              level: [2, 3],
              label: 'このページの内容'
            },
            lastUpdated: {
              text: '最終更新',
              formatOptions: {
                dateStyle: 'medium'
              }
            },
            docFooter: {
              prev: '前のページ',
              next: '次のページ'
            },
            editLink: {
              pattern: editLinkPattern,
              text: 'GitHub でこのページを編集'
            },
            darkModeSwitchLabel: '外観',
            lightModeSwitchTitle: 'ライトテーマに切り替え',
            darkModeSwitchTitle: 'ダークテーマに切り替え',
            sidebarMenuLabel: 'メニュー',
            langMenuLabel: '言語を変更'
          }
        }
      }
    })
  ),
  sidebarOptions
)

if (config.themeConfig?.sidebar) {
  config.themeConfig.sidebar = directorySidebar(
    config.themeConfig.sidebar as Sidebar
  )
}

export default config
