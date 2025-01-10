'use client'

import { WaveTheme, WaveThemeName } from '../lib/types'
import { waveThemes } from '../lib/wave-themes'

interface ThemeSelectorProps {
  onThemeChange: (theme: WaveTheme) => void
  currentTheme: WaveThemeName
}

export function ThemeSelector({ onThemeChange, currentTheme }: ThemeSelectorProps) {
  return (
    <div className="absolute bottom-4 right-4 flex gap-2 z-50">
      {Object.entries(waveThemes).map(([key, theme]) => (
        <button
          key={key}
          onClick={() => onThemeChange(theme)}
          className={`px-3 py-1.5 rounded-full text-sm transition-all backdrop-blur-sm
            ${
              currentTheme === key
                ? 'bg-white/20 text-white shadow-lg'
                : 'bg-black/10 hover:bg-white/10 text-white/70 hover:text-white'
            }`}
        >
          {theme.name}
        </button>
      ))}
    </div>
  )
}
