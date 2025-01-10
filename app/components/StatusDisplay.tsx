'use client'

import { useState } from 'react'
import type { MoodStats, WebSocketStatus } from '../lib/types'

interface StatusDisplayProps {
  stats: MoodStats
  wsStatus?: WebSocketStatus
  onReset?: () => void
}

export default function StatusDisplay({ stats, wsStatus, onReset }: StatusDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const emojiPercentage = stats.totalPosts > 0 ? (stats.totalEmojis / stats.totalPosts) * 100 : 0
  const positivePercentage = stats.totalEmojis > 0 ? (stats.positiveCount / stats.totalEmojis) * 100 : 0
  const neutralPercentage = stats.totalEmojis > 0 ? (stats.neutralCount / stats.totalEmojis) * 100 : 0
  const negativePercentage = stats.totalEmojis > 0 ? (stats.negativeCount / stats.totalEmojis) * 100 : 0

  return (
    <div className="fixed bottom-4 right-4 sm:right-auto left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4 font-mono text-xs sm:text-sm text-white/80">
      <div className="space-y-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-20">WebSocket:</span>
            <span
              className={`capitalize ${
                wsStatus === 'connected'
                  ? 'text-green-400'
                  : wsStatus === 'connecting'
                  ? 'text-yellow-400'
                  : 'text-red-400'
              }`}
            >
              {wsStatus}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {onReset && (
              <button
                onClick={onReset}
                className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
                title="Reset all statistics"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-50 hover:opacity-100 transition-opacity"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              </button>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 hover:bg-white/10 rounded-full transition-colors"
              title={isExpanded ? 'Show less' : 'Show more'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`opacity-50 hover:opacity-100 transition-all transform ${isExpanded ? 'rotate-180' : ''}`}
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
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
        <div
          className={`space-y-1 overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="w-20">Posts:</span>
            <span>{stats.totalPosts.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-20">Emojis:</span>
            <span>{stats.totalEmojis.toLocaleString()}</span>
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
    </div>
  )
}
