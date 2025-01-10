'use client'

import { useEffect, useRef, useState } from 'react'
import { MoodEngine, type Mood } from './lib/mood-engine'
import MoodDisplay from './components/MoodDisplay'

export default function BlueSkyMood() {
  const [mood, setMood] = useState<Mood>({ score: 0, description: 'Neutral' })
  const backgroundRef = useRef<HTMLCanvasElement>(null)
  const waveRef = useRef<HTMLCanvasElement>(null)
  const emojiRef = useRef<HTMLCanvasElement>(null)
  const engineRef = useRef<MoodEngine>()

  useEffect(() => {
    if (!backgroundRef.current || !waveRef.current || !emojiRef.current) return

    // Create engine instance with mood update callback
    engineRef.current = new MoodEngine((newMood) => setMood(newMood))

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

      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
        <MoodDisplay mood={mood} />
      </div>
    </div>
  )
}
