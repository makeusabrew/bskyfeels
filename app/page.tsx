'use client'

import { useEffect, useRef, useState } from 'react'
import { MoodEngine } from './lib/mood-engine'
import { Mood, MoodStats, WebSocketStatus, WaveThemeName, WaveTheme } from './lib/types'
import MoodDisplay from './components/MoodDisplay'
import StatusDisplay from './components/StatusDisplay'
import { ThemeSelector } from './components/ThemeSelector'
import { WaveRenderer } from './lib/renderers/wave-renderer'
import { waveThemes } from './lib/wave-themes'

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
  const rendererRef = useRef<WaveRenderer | null>(null)
  const [currentTheme, setCurrentTheme] = useState<WaveThemeName>('classic')

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

    rendererRef.current = new WaveRenderer(waveRef.current)

    // Initialize engine with canvas references
    const cleanup = engineRef.current.init({
      background: backgroundRef.current,
      wave: waveRef.current,
      emoji: emojiRef.current,
    })

    return cleanup
  }, [])

  const handleThemeChange = (theme: WaveTheme) => {
    if (!rendererRef.current) return
    rendererRef.current.setTheme(theme)
    setCurrentTheme(Object.keys(waveThemes).find((key) => waveThemes[key as WaveThemeName] === theme) as WaveThemeName)
  }

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-stone-800">
      <canvas ref={backgroundRef} className="absolute inset-0 z-0" />
      <canvas ref={waveRef} className="absolute inset-0 z-10" />
      <canvas ref={emojiRef} className="absolute inset-0 z-20" />

      <div className="absolute inset-0 z-30">
        <div className="flex flex-col items-center justify-center h-full">
          <MoodDisplay mood={mood} />
        </div>

        <StatusDisplay stats={stats} wsStatus={wsStatus} onReset={handleReset} />
      </div>

      <ThemeSelector currentTheme={currentTheme} onThemeChange={handleThemeChange} />
    </div>
  )
}
