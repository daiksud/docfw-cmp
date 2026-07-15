'use client'

import type { ChangeEvent, FC } from 'react'

type Framework = 'nextra' | 'vitepress'

const routePattern = /^(.*\/)(?:nextra|vitepress)(\/(?:en|ja)(?:\/.*)?$)/

function frameworkUrl(framework: Framework): string {
  const url = new URL(window.location.href)
  const matchedRoute = url.pathname.match(routePattern)

  if (matchedRoute) {
    url.pathname = `${matchedRoute[1]}${framework}${matchedRoute[2]}`
  } else {
    // `next dev` removes the production base path. Keep a canonical fallback
    // so the switcher also points at the assembled Pages-style preview.
    const pagePath = url.pathname.startsWith('/')
      ? url.pathname
      : `/${url.pathname}`
    url.pathname = `/docfw-cmp/${framework}${pagePath}`
  }

  return url.toString()
}

export const FrameworkSwitcher: FC<{ label: string }> = ({ label }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const framework = event.currentTarget.value as Framework

    if (framework !== 'nextra') {
      window.location.assign(frameworkUrl(framework))
    }
  }

  return (
    <label className="framework-switcher">
      <span className="x:sr-only">{label}</span>
      <select
        className="framework-switcher__select"
        aria-label={label}
        title={label}
        value="nextra"
        onChange={handleChange}
      >
        <option value="nextra">Nextra</option>
        <option value="vitepress">VitePress</option>
      </select>
    </label>
  )
}
