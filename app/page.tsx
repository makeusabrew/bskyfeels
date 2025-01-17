'use client'

import { useEffect, useRef, useState } from 'react'
import { MoodEngine } from './lib/mood-engine'
import { Mood, MoodStats, WebSocketStatus, WaveThemeName, WaveTheme } from './lib/types'
import MoodDisplay from './components/MoodDisplay'
import StatusDisplay from './components/StatusDisplay'
import { ThemeMenu } from './components/ThemeMenu'
import { WaveRenderer } from './lib/renderers/wave-renderer'
import { waveThemes } from './lib/wave-themes'
import { loadTheme, saveTheme } from './lib/storage'

export default function BlueSkyMood() {
  const [mood, setMood] = useState<Mood>({ score: 0, description: 'Neutral' })
  const [wsStatus, setWsStatus] = useState<WebSocketStatus>('disconnected')
  const [stats, setStats] = useState<MoodStats>({
    totalPosts: 0,
    totalEmojis: 0,
    rawSentiment: 0,
    normalizedScore: 0,
    description: 'Neutral',
    positiveCount: 0,
    neutralCount: 0,
    negativeCount: 0,
  })
  const backgroundRef = useRef<HTMLCanvasElement>(null)
  const waveRef = useRef<HTMLCanvasElement>(null)
  const emojiRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<MoodEngine>()
  const [currentTheme, setCurrentTheme] = useState<WaveThemeName>(() => {
    // Initialize theme from localStorage or fallback to classic
    return loadTheme() || 'classic'
  })

  const handleReset = () => {
    if (engineRef.current) {
      engineRef.current.reset()
      setStats(engineRef.current.getMoodStats())
    }
  }

  useEffect(() => {
    if (!backgroundRef.current || !waveRef.current || !emojiRef.current) return

    // Create engine instance with mood update callback
    engineRef.current = new MoodEngine((newMood) => {
      setMood(newMood)
      // Update stats whenever mood changes
      if (engineRef.current) {
        setStats(engineRef.current.getMoodStats())
      }
    }, setWsStatus)

    // Initialize engine with canvas references and pass the renderer
    const cleanup = engineRef.current.init({
      background: backgroundRef.current,
      wave: waveRef.current,
      emoji: emojiRef.current,
    })

    engineRef.current.setTheme(waveThemes[currentTheme])

    return cleanup
  }, [])

  const handleThemeChange = (theme: WaveTheme) => {
    if (!engineRef.current) return
    const themeName = Object.keys(waveThemes).find((key) => waveThemes[key as WaveThemeName] === theme) as WaveThemeName
    engineRef.current.setTheme(theme)
    setCurrentTheme(themeName)
    saveTheme(themeName)
  }

  return (
    <div className="fixed inset-0 overflow-hidden bg-stone-800">
      <canvas ref={backgroundRef} className="absolute inset-0 z-0 pointer-events-none" />
      <canvas ref={waveRef} className="absolute inset-0 z-10 pointer-events-none" />
      <canvas ref={emojiRef} className="absolute inset-0 z-20" />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
        <MoodDisplay mood={mood} />
      </div>

      <div className="relative z-40">
        <StatusDisplay stats={stats} wsStatus={wsStatus} onReset={handleReset} />
      </div>

      <ThemeMenu currentTheme={currentTheme} onThemeChange={handleThemeChange} />

      {/* Attribution */}
      <div className="fixed top-4 left-4 z-50 flex items-center gap-4">
        <a
          href="https://bsky.app/profile/makeusabrew.bsky.social"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/60 hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-md"
        >
          <span>@makeusabrew</span>
        </a>
        <a
          href="https://github.com/makeusabrew/bskyfeels/tree/main?tab=readme-ov-file#readme"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/60 hover:bg-white/20 transition-colors flex items-center gap-2 backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-md"
        >
          <span>About</span>
        </a>
      </div>
    </div>
  )
}
