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
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 blur-3xl opacity-30"
        animate={{
          background: [
            `radial-gradient(circle, ${
              mood.score > 0 ? 'rgba(255,255,0,0.2)' : 'rgba(0,0,255,0.2)'
            } 0%, transparent 70%)`,
            `radial-gradient(circle, ${
              mood.score > 0 ? 'rgba(255,200,0,0.2)' : 'rgba(100,0,255,0.2)'
            } 0%, transparent 70%)`,
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />

      <motion.div
        className="text-center text-white relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Title with floating animation */}
        <motion.h1
          className="text-6xl font-bold mb-8 text-shadow-lg tracking-tight"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="opacity-80">Bluesky is</span> <span className="opacity-90">feeling</span>
          <span className="opacity-70">...</span>
        </motion.h1>

        {/* Mood description with dynamic colors and spring animation */}
        <motion.div
          className="relative inline-block"
          key={mood.description}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
            mass: 1,
          }}
        >
          {/* Background blur for text */}
          <motion.div
            className="absolute inset-0 blur-xl opacity-30"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />

          <h2
            className={`text-8xl font-extrabold bg-gradient-to-r ${getColorScheme(
              mood.score
            )} bg-clip-text text-transparent px-4 py-2 tracking-tight`}
          >
            {mood.description}
          </h2>
        </motion.div>
      </motion.div>
    </div>
  )
}
