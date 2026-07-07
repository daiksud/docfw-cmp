export { proxy } from 'nextra/locales'

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, the Pagefind index, and `favicon.ico`
  // (the only static file under `app/` that isn't locale-prefixed). Any other
  // path excluded here must correspond to a real static file under `app/`,
  // otherwise it falls through to the `[lang]` catch-all with an invalid
  // `lang` value and crashes.
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|_pagefind).*)'
  ]
}
