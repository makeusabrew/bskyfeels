'use client'

import type { MoodStats } from '../lib/types'

interface StatusDisplayProps {
  stats: MoodStats
}

export default function StatusDisplay({ stats }: StatusDisplayProps) {
  const emojiPercentage = stats.totalPosts > 0 ? (stats.totalEmojis / stats.totalPosts) * 100 : 0
  const positivePercentage = stats.totalEmojis > 0 ? (stats.positiveCount / stats.totalEmojis) * 100 : 0
  const neutralPercentage = stats.totalEmojis > 0 ? (stats.neutralCount / stats.totalEmojis) * 100 : 0
  const negativePercentage = stats.totalEmojis > 0 ? (stats.negativeCount / stats.totalEmojis) * 100 : 0

  return (
    <div className="fixed bottom-4 right-4 sm:right-auto left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-white/80">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-20">Mood:</span>
          <span
            className={`${
              stats.normalizedScore > 0
                ? 'text-green-400'
                : stats.normalizedScore < 0
                ? 'text-red-400'
                : 'text-blue-400'
            }`}
          >
            {stats.normalizedScore.toFixed(3)}
          </span>
          <span className="text-xs opacity-50">({stats.description})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20">Posts:</span>
          <span>{stats.totalPosts.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20">Emojis:</span>
          <span>{stats.totalEmojis.toLocaleString()}</span>
          <span className="text-xs opacity-50">({emojiPercentage.toFixed(1)}% of posts)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20">Positive:</span>
          <span className="text-green-400">{stats.positiveCount.toLocaleString()}</span>
          <span className="text-xs opacity-50">({positivePercentage.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20">Neutral:</span>
          <span className="text-blue-400">{stats.neutralCount.toLocaleString()}</span>
          <span className="text-xs opacity-50">({neutralPercentage.toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20">Negative:</span>
          <span className="text-red-400">{stats.negativeCount.toLocaleString()}</span>
          <span className="text-xs opacity-50">({negativePercentage.toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  )
}
