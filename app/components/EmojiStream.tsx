'use client'

import { motion } from 'framer-motion'

interface EmojiStreamProps {
  emojiData: Array<{ emoji: string; sentiment: number; id: number }>
}

// Deterministic random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

// Generate variations based on emoji ID
function getVariations(id: number) {
  return {
    yOffset: (seededRandom(id) - 0.5) * 20,
    duration: 12 + seededRandom(id * 2) * 6,
    scale: 0.75 + seededRandom(id * 3) * 0.5,
    rotate: (seededRandom(id * 4) - 0.5) * 30,
    opacity: 0.7 + seededRandom(id * 5) * 0.3,
  }
}

export default function EmojiStream({ emojiData }: EmojiStreamProps) {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {emojiData.map((data) => {
        const variation = getVariations(data.id)
        const basePosition = ((data.sentiment + 1) / 2) * 100

        return (
          <motion.div
            key={data.id}
            className="absolute text-4xl"
            initial={{
              x: '100vw',
              opacity: 0,
              scale: variation.scale,
              rotate: variation.rotate,
            }}
            animate={{
              x: '-100vw',
              opacity: variation.opacity,
              scale: variation.scale,
              rotate: variation.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{
              x: {
                duration: variation.duration,
                ease: 'linear',
              },
              opacity: {
                duration: 0.5,
              },
            }}
            style={{
              top: `${basePosition + variation.yOffset}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {data.emoji}
          </motion.div>
        )
      })}
    </div>
  )
}
