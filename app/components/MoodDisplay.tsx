"use client"

import { motion } from 'framer-motion'

interface MoodDisplayProps {
  mood: { score: number; description: string }
}

export default function MoodDisplay({ mood }: MoodDisplayProps) {
  return (
    <motion.div
      className="text-center text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-6xl font-bold mb-4 text-shadow-lg">Bluesky is feeling...</h1>
      <motion.p
        key={mood.description}
        className="text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {mood.description}
      </motion.p>
    </motion.div>
  )
}

