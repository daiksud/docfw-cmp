'use client'

import { useState } from 'react'
import type { FC } from 'react'

/**
 * A tiny interactive component used on the MDX demo page to show that React
 * components (with state and event handlers) can be embedded directly in MDX.
 */
export const Counter: FC<{ label?: string }> = ({ label = 'Clicked' }) => {
  const [count, setCount] = useState(0)
  return (
    <button
      type="button"
      onClick={() => setCount(c => c + 1)}
      style={{
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--nextra-border-color, #ccc)',
        cursor: 'pointer',
        fontWeight: 600
      }}
    >
      {label}: {count}
    </button>
  )
}
