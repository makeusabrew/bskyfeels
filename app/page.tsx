'use client'

import { useState, useEffect } from 'react'
import MoodDisplay from './components/MoodDisplay'
import SentimentBackground from './components/SentimentBackground'
import EmojiStream from './components/EmojiStream'
import WavySeparator from './components/WavySeparator'

const emojis = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '😊',
  '😇',
  '🙂',
  '🙃',
  '😉',
  '😌',
  '😍',
  '🥰',
  '😘',
  '😗',
  '😙',
  '😚',
  '😋',
  '😛',
  '😝',
  '😜',
  '🤪',
  '🤨',
  '🧐',
  '🤓',
  '😎',
  '🤩',
  '🥳',
  '😏',
  '😒',
  '😞',
  '😔',
  '😟',
  '😕',
  '🙁',
  '☹️',
  '😣',
  '😖',
  '😫',
  '😩',
  '🥺',
  '😢',
  '😭',
  '😤',
  '😠',
  '😡',
  '🤬',
  '🤯',
  '😳',
  '🥵',
  '🥶',
  '😱',
  '😨',
  '😰',
  '😥',
  '😓',
  '🤗',
  '🤔',
  '🤭',
  '🤫',
  '🤥',
  '😶',
  '😐',
  '😑',
  '😬',
  '🙄',
  '😯',
  '😦',
  '😧',
  '😮',
  '😲',
  '🥱',
  '😴',
  '🤤',
  '😪',
  '😵',
  '🤐',
  '🥴',
  '🤢',
  '🤮',
  '🤧',
  '😷',
  '🤒',
  '🤕',
]

function generateFakeData() {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)]
  const sentiment = Math.random() * 2 - 1 // Random number between -1 and 1
  return { emoji, sentiment }
}

export default function BlueSkyMood() {
  const [mood, setMood] = useState({ score: 0, description: 'Neutral' })
  const [emojiData, setEmojiData] = useState<Array<{ emoji: string; sentiment: number }>>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = generateFakeData()
      setMood((prevMood) => {
        const newScore = prevMood.score * 0.95 + newData.sentiment * 0.05 // Smooth out changes
        return {
          score: newScore,
          description: getDescriptionFromScore(newScore),
        }
      })
      setEmojiData((prevData) => [newData, ...prevData.slice(0, 19)])
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
