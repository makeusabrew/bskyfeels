'use client'

import { motion } from 'framer-motion'
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
          <span className="w-24">Total Posts:</span>
          <motion.span key={stats.totalEmojis} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
            {stats.totalEmojis.toLocaleString()}
          </motion.span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Positive:</span>
          <motion.span
            key={stats.positiveCount}
            className="text-green-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {stats.positiveCount.toLocaleString()}
          </motion.span>
          <span className="text-xs opacity-50">({((stats.positiveCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Neutral:</span>
          <motion.span
            key={stats.neutralCount}
            className="text-blue-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {stats.neutralCount.toLocaleString()}
          </motion.span>
          <span className="text-xs opacity-50">({((stats.neutralCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Negative:</span>
          <motion.span
            key={stats.negativeCount}
            className="text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {stats.negativeCount.toLocaleString()}
          </motion.span>
          <span className="text-xs opacity-50">({((stats.negativeCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
      </div>
    </motion.div>
  )
}
