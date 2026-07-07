'use client'

import cn from 'clsx'
import { Button, Select } from 'nextra/components'
import { useCopy } from 'nextra/hooks'
import {
  ArrowRightIcon,
  ChatGPTIcon,
  ClaudeIcon,
  CopyIcon,
  LinkArrowIcon
} from 'nextra/icons'
import type { ComponentType, FC, ReactNode, SVGProps } from 'react'

export type CopyPageDictionary = {
  copy: string
  copied: string
  copyDescription: string
  chatgptTitle: string
  claudeTitle: string
  askDescription: string
}

const Item: FC<{
  icon: ComponentType<SVGProps<SVGElement>>
  title: ReactNode
  description: ReactNode
  isExternal?: boolean
}> = ({ icon: Icon, title, description, isExternal }) => (
  <div className="x:flex x:gap-3 x:items-center">
    <Icon width="16" />
    <div className="x:flex x:flex-col">
      <span className="x:font-medium x:flex x:gap-1">
        {title}
        {isExternal && <LinkArrowIcon height="1em" />}
      </span>
      <span className="x:text-xs">{description}</span>
    </div>
  </div>
)

/**
 * Localized re-implementation of `nextra-theme-docs`' built-in `<CopyPage>`,
 * which only renders hardcoded English strings. Rendered manually in
 * `page.tsx` (with `copyPageButton={false}` on `<Layout>`) so the button and
 * its dropdown can be translated per-locale.
 */
export const CopyPage: FC<{
  sourceCode: string
  dict: CopyPageDictionary
}> = ({ sourceCode, dict }) => {
  const { copy, isCopied } = useCopy()

  const handleCopy = () => {
    copy(sourceCode)
  }

  return (
    // `data-pagefind-ignore`: this is rendered inside `<main data-pagefind-body>`
    // (as a child passed to `<Wrapper>`), so without this attribute Pagefind
    // would index the button/menu UI text (e.g. "Copy page") as page content.
    <div
      data-pagefind-ignore
      className="x:border x:inline-flex x:rounded-md x:items-stretch nextra-border x:float-end x:overflow-hidden"
    >
      <Button
        className={({ hover }) =>
          cn(
            'x:ps-2 x:pe-1 x:flex x:gap-2 x:text-sm x:font-medium x:items-center',
            isCopied && 'x:opacity-70',
            hover &&
              'x:bg-gray-200 x:text-gray-900 x:dark:bg-primary-100/5 x:dark:text-gray-50'
          )
        }
        onClick={handleCopy}
      >
        <CopyIcon width="16" />
        {isCopied ? dict.copied : dict.copy}
      </Button>
      <Select
        anchor={{ to: 'bottom end', gap: 10 }}
        className="x:rounded-none"
        options={[
          {
            id: 'copy',
            name: (
              <Item
                icon={CopyIcon}
                title={dict.copy}
                description={dict.copyDescription}
              />
            )
          },
          {
            id: 'chatgpt',
            name: (
              <Item
                icon={ChatGPTIcon}
                title={dict.chatgptTitle}
                description={dict.askDescription}
                isExternal
              />
            )
          },
          {
            id: 'claude',
            name: (
              <Item
                icon={ClaudeIcon}
                title={dict.claudeTitle}
                description={dict.askDescription}
                isExternal
              />
            )
          }
        ]}
        value=""
        selectedOption={<ArrowRightIcon width="12" className="x:rotate-90" />}
        onChange={value => {
          if (value === 'copy') {
            handleCopy()
            return
          }
          const url =
            value === 'chatgpt'
              ? 'chatgpt.com/?hints=search&prompt'
              : 'claude.ai/new?q'
          const query = `Read from ${location.href} so I can ask questions about it.`
          window.open(`https://${url}=${encodeURIComponent(query)}`, '_blank')
        }}
      />
    </div>
  )
}
