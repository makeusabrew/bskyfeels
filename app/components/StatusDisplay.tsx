'use client'

import { motion } from 'framer-motion'
import AnimatedNumbers from 'react-animated-numbers'
import type { MoodStats } from '../lib/mood-engine'

interface StatusDisplayProps {
  stats: MoodStats
}

export default function StatusDisplay({ stats }: StatusDisplayProps) {
  return (
    <motion.div
      className="fixed bottom-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-white/80"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-24">Posts:</span>
          <AnimatedNumbers
            includeComma
            transitions={(index) => ({
              type: 'spring',
              duration: index + 0.3,
            })}
            animateToNumber={stats.totalPosts}
            fontStyle={{ fontFamily: 'monospace' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Emojis:</span>
          <AnimatedNumbers
            includeComma
            transitions={(index) => ({
              type: 'spring',
              duration: index + 0.3,
            })}
            animateToNumber={stats.totalEmojis}
            fontStyle={{ fontFamily: 'monospace' }}
          />
          <span className="text-xs opacity-50">
            ({((stats.totalEmojis / stats.totalPosts) * 100).toFixed(1)}% of posts)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Positive:</span>
          <AnimatedNumbers
            includeComma
            className="text-green-400"
            transitions={(index) => ({
              type: 'spring',
              duration: index + 0.3,
            })}
            animateToNumber={stats.positiveCount}
            fontStyle={{ fontFamily: 'monospace' }}
          />
          <span className="text-xs opacity-50">({((stats.positiveCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Neutral:</span>
          <AnimatedNumbers
            includeComma
            className="text-blue-400"
            transitions={(index) => ({
              type: 'spring',
              duration: index + 0.3,
            })}
            animateToNumber={stats.neutralCount}
            fontStyle={{ fontFamily: 'monospace' }}
          />
          <span className="text-xs opacity-50">({((stats.neutralCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Negative:</span>
          <AnimatedNumbers
            includeComma
            className="text-red-400"
            transitions={(index) => ({
              type: 'spring',
              duration: index + 0.3,
            })}
            animateToNumber={stats.negativeCount}
            fontStyle={{ fontFamily: 'monospace' }}
          />
          <span className="text-xs opacity-50">({((stats.negativeCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
      </div>
    </motion.div>
  )
}
