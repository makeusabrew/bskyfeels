'use client'

import { useState, useEffect, useRef } from 'react'
import MoodDisplay from './components/MoodDisplay'
import SentimentBackground from './components/SentimentBackground'
import EmojiStream from './components/EmojiStream'
import WavySeparator from './components/WavySeparator'

const emojis: [string, number][] = [
  ['😀', 0.8], // Very happy
  ['😃', 0.7], // Happy
  ['😄', 0.8], // Very happy
  ['😁', 0.9], // Very happy
  ['😆', 0.7], // Happy
  ['😅', 0.5], // Slightly happy
  ['😂', 0.6], // Happy
  ['🤣', 0.6], // Happy
  ['😊', 0.7], // Happy
  ['😇', 0.8], // Very happy
  ['🙂', 0.3], // Slightly happy
  ['🙃', 0.1], // Neutral-ish
  ['😉', 0.4], // Slightly happy
  ['😌', 0.2], // Slightly positive
  ['😍', 0.9], // Very happy
  ['🥰', 1.0], // Maximum happiness
  ['😘', 0.8], // Very happy
  ['😗', 0.4], // Slightly happy
  ['😙', 0.5], // Moderately happy
  ['😚', 0.6], // Happy
  ['😋', 0.7], // Happy
  ['😛', 0.4], // Playful positive
  ['😝', 0.3], // Playful positive
  ['😜', 0.3], // Playful positive
  ['🤪', 0.2], // Chaotic neutral
  ['🤨', -0.2], // Slightly negative
  ['🧐', 0.0], // Neutral
  ['🤓', 0.2], // Slightly positive
  ['😎', 0.6], // Cool positive
  ['🤩', 0.9], // Very happy
  ['🥳', 0.8], // Very happy
  ['😏', 0.1], // Slightly smug
  ['😒', -0.4], // Negative
  ['😞', -0.7], // Very negative
  ['😔', -0.6], // Negative
  ['😟', -0.5], // Worried
  ['😕', -0.3], // Slightly negative
  ['🙁', -0.4], // Negative
  ['☹️', -0.6], // Negative
  ['😣', -0.7], // Very negative
  ['😖', -0.8], // Very negative
  ['😫', -0.7], // Very negative
  ['😩', -0.6], // Negative
  ['🥺', -0.3], // Pleading/sad
  ['😢', -0.7], // Very negative
  ['😭', -0.9], // Maximum sadness
  ['😤', -0.5], // Angry
  ['😠', -0.7], // Very angry
  ['😡', -0.8], // Very angry
  ['🤬', -1.0], // Maximum anger
  ['🤯', -0.4], // Overwhelmed
  ['😳', -0.2], // Surprised/shocked
  ['🥵', -0.3], // Hot/uncomfortable
  ['🥶', -0.3], // Cold/uncomfortable
  ['😱', -0.8], // Very scared
  ['😨', -0.6], // Scared
  ['😰', -0.5], // Worried
  ['😥', -0.4], // Sad
  ['😓', -0.5], // Negative
  ['🤗', 0.6], // Happy/hugging
  ['🤔', 0.0], // Neutral thinking
  ['🤭', 0.3], // Slightly amused
  ['🤫', 0.0], // Neutral
  ['🤥', -0.3], // Slightly negative
  ['😶', 0.0], // Neutral
  ['😐', 0.0], // Neutral
  ['😑', -0.1], // Slightly annoyed
  ['😬', -0.2], // Uncomfortable
  ['🙄', -0.3], // Annoyed
  ['😯', 0.0], // Surprised neutral
  ['😦', -0.4], // Negative
  ['😧', -0.5], // Negative
  ['😮', -0.1], // Surprised
  ['😲', -0.2], // Shocked
  ['🥱', -0.2], // Tired
  ['😴', 0.1], // Peaceful sleep
  ['🤤', 0.2], // Content
  ['😪', -0.1], // Tired
  ['😵', -0.4], // Negative
  ['🤐', -0.2], // Slightly negative
  ['🥴', -0.3], // Woozy
  ['🤢', -0.8], // Very negative
  ['🤮', -0.9], // Very negative
  ['🤧', -0.3], // Slightly negative
  ['😷', -0.2], // Slightly negative
  ['🤒', -0.5], // Negative
  ['🤕', -0.6], // Negative
]

function generateFakeData() {
  const [emoji, sentiment] = emojis[Math.floor(Math.random() * emojis.length)]
  return { emoji, sentiment }
}

export default function BlueSkyMood() {
  const [mood, setMood] = useState({ score: 0, description: 'Neutral' })
  const [emojiData, setEmojiData] = useState<Array<{ emoji: string; sentiment: number; id: number }>>([])
  const nextIdRef = useRef(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const newEmoji = { ...generateFakeData(), id: nextIdRef.current++ }
      setMood((prevMood) => {
        const newScore = prevMood.score * 0.95 + newEmoji.sentiment * 0.05 // Smooth out changes
        return {
          score: newScore,
          description: getDescriptionFromScore(newScore),
        }
      })
      setEmojiData((prevData) => {
        // Keep last 100 emojis
        const newData = [...prevData, newEmoji]
        if (newData.length > 100) {
          return newData.slice(-100)
        }
        return newData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen w-screen overflow-hidden relative">
      <SentimentBackground />
      <WavySeparator sentiment={mood.score} />
      <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 20 }}>
        <MoodDisplay mood={mood} />
      </div>
      <EmojiStream emojiData={emojiData} />
    </div>
  )
}

function getDescriptionFromScore(score: number): string {
  if (score > 0.5) return 'Ecstatic'
  if (score > 0.3) return 'Happy'
  if (score > 0.1) return 'Positive'
  if (score > -0.1) return 'Neutral'
  if (score > -0.3) return 'Uneasy'
  if (score > -0.5) return 'Sad'
  return 'Gloomy'
}
