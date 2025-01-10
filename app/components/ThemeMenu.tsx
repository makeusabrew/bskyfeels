'use client'

import { useState } from 'react'
import { WaveTheme, WaveThemeName } from '../lib/types'
import { waveThemes } from '../lib/wave-themes'

interface ThemeMenuProps {
  onThemeChange: (theme: WaveTheme) => void
  currentTheme: WaveThemeName
}

export function ThemeMenu({ onThemeChange, currentTheme }: ThemeMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M12 2v1M12 21v1M4.2 4.2l.7.7m12.1 12.1l.7.7M2 12h1m18 0h1M4.2 19.8l.7-.7m12.1-12.1l.7-.7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-black/50 backdrop-blur-lg rounded-lg p-2 shadow-xl">
          <div className="grid grid-cols-2 gap-2 w-48">
            {Object.entries(waveThemes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => {
                  onThemeChange(theme)
                  setIsOpen(false)
                }}
                className={`px-3 py-1.5 rounded-md text-sm transition-all
                  ${
                    currentTheme === key ? 'bg-white/20 text-white' : 'hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
              >
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
