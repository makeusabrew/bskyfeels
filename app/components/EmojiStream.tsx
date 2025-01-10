'use client'

import { motion } from 'framer-motion'

interface EmojiStreamProps {
  emojiData: Array<{ emoji: string; sentiment: number; id: number }>
}

export default function EmojiStream({ emojiData }: EmojiStreamProps) {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {emojiData.map((data) => (
        <motion.div
          key={data.id}
          className="absolute text-4xl"
          initial={{ x: '100vw' }}
          animate={{ x: '-100vw' }}
          exit={{ opacity: 0 }}
          transition={{
            x: {
              duration: 15,
              ease: 'linear',
            },
          }}
          style={{
            // Convert sentiment from [-1, 1] to [0, 1] for positioning
            // and invert it because we want negative at top
            top: `${((1 - data.sentiment) / 2) * 100}%`,
            transform: 'translate(-50%, -50%)', // Center the emoji
          }}
        >
          {data.emoji}
        </motion.div>
      ))}
    </div>
  )
}
