'use client'

import type { MoodStats } from '../lib/mood-engine'

interface StatusDisplayProps {
  stats: MoodStats
}

export default function StatusDisplay({ stats }: StatusDisplayProps) {
  return (
    <div className="fixed bottom-4 left-4 bg-black/20 backdrop-blur-sm rounded-lg p-4 font-mono text-sm text-white/80">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="w-24">Posts:</span>
          <span>{stats.totalPosts.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Emojis:</span>
          <span>{stats.totalEmojis.toLocaleString()}</span>
          <span className="text-xs opacity-50">
            ({((stats.totalEmojis / stats.totalPosts) * 100).toFixed(1)}% of posts)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Positive:</span>
          <span className="text-green-400">{stats.positiveCount.toLocaleString()}</span>
          <span className="text-xs opacity-50">({((stats.positiveCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Neutral:</span>
          <span className="text-blue-400">{stats.neutralCount.toLocaleString()}</span>
          <span className="text-xs opacity-50">({((stats.neutralCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-24">Negative:</span>
          <span className="text-red-400">{stats.negativeCount.toLocaleString()}</span>
          <span className="text-xs opacity-50">({((stats.negativeCount / stats.totalEmojis) * 100).toFixed(1)}%)</span>
        </div>
      </div>
    </div>
  )
}
