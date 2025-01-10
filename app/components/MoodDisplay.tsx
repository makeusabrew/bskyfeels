'use client'

import { motion } from 'framer-motion'

interface MoodDisplayProps {
  mood: { score: number; description: string }
}

export default function MoodDisplay({ mood }: MoodDisplayProps) {
  // Get color scheme based on mood score
  const getColorScheme = (score: number) => {
    if (score > 0.3) return 'from-yellow-300 via-orange-300 to-rose-300' // Happy colors
    if (score < -0.3) return 'from-blue-400 via-indigo-400 to-purple-500' // Sad colors
    return 'from-blue-300 via-teal-300 to-emerald-300' // Neutral colors
  }

  return (
    <div className="relative">
      <div className="text-center text-white relative">
        <motion.h1
          className="text-5xl sm:text-6xl font-bold mb-4 sm:mb-8 text-shadow-lg tracking-tight"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="opacity-80">Bluesky</span>&nbsp;<span className="opacity-90">feels</span>
          {/* <span className="opacity-70">...</span> */}
        </motion.h1>

        <motion.h2
          className={`text-7xl sm:text-8xl font-extrabold bg-gradient-to-r ${getColorScheme(
            mood.score
          )} bg-clip-text text-transparent px-4 py-2 tracking-tight`}
          animate={{ y: [8, 0, 8] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {mood.description}
        </motion.h2>
      </div>
    </div>
  )
}
