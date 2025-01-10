'use client'

import { useEffect, useRef, useState } from 'react'
import { MoodEngine } from './lib/mood-engine'
import { Mood, MoodStats } from './lib/types'
import MoodDisplay from './components/MoodDisplay'
import StatusDisplay from './components/StatusDisplay'

export default function BlueSkyMood() {
  const [mood, setMood] = useState<Mood>({ score: 0, description: 'Neutral' })
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

  useEffect(() => {
    if (!backgroundRef.current || !waveRef.current || !emojiRef.current) return

    // Create engine instance with mood update callback
    engineRef.current = new MoodEngine((newMood) => {
      setMood(newMood)
      // Update stats whenever mood changes
      if (engineRef.current) {
        setStats(engineRef.current.getMoodStats())
      }
    })

    // Initialize engine with canvas references
    const cleanup = engineRef.current.init({
      background: backgroundRef.current,
      wave: waveRef.current,
      emoji: emojiRef.current,
    })

    return cleanup
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <canvas ref={backgroundRef} className="absolute inset-0" />
      <canvas ref={waveRef} className="absolute inset-0" />
      <canvas ref={emojiRef} className="absolute inset-0" />

      <div className="absolute inset-0 z-20">
        <div className="flex flex-col items-center justify-center h-full">
          <MoodDisplay mood={mood} />
        </div>

        <StatusDisplay stats={stats} />
      </div>
    </div>
  )
}
