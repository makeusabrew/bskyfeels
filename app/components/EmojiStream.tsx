"use client"

import { motion } from 'framer-motion'

interface EmojiStreamProps {
  emojiData: Array<{ emoji: string; sentiment: number }>
}

export default function EmojiStream({ emojiData }: EmojiStreamProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 h-32 overflow-hidden">
      <div className="relative w-full h-full">
        {emojiData.map((data, index) => (
          <motion.div
            key={index}
            className="absolute text-4xl"
            initial={{ x: '100%' }}
            animate={{ x: '-100%' }}
            transition={{ duration: 10, ease: 'linear', delay: index * 0.5 }}
            style={{ 
              top: `${(1 - data.sentiment) * 50}%`,
              zIndex: 10 // Ensure emojis are above the background
            }}
          >
            {data.emoji}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

