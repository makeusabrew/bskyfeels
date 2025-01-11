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
        className="px-3 py-1.5 text-sm rounded-md bg-black/20 backdrop-blur-sm text-white/80 hover:bg-white/20 transition-all"
      >
        Change theme
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
