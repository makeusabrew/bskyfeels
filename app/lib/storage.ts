import { Mood, MoodStats, WaveThemeName } from './types'

const STORAGE_KEY = 'bluesky-mood-stats'
const THEME_KEY = 'bluesky-mood-theme'

interface StoredStats {
  mood: Mood
  totalPosts: number
  totalEmojis: number
  positiveCount: number
  neutralCount: number
  negativeCount: number
  rawSentiment: number
  lastUpdated: number
}

export function saveTheme(theme: WaveThemeName) {
  try {
    localStorage.setItem(THEME_KEY, theme)
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error)
  }
}

export function loadTheme(): WaveThemeName | null {
  try {
    const theme = localStorage.getItem(THEME_KEY) as WaveThemeName
    return theme || null
  } catch (error) {
    console.error('Failed to load theme from localStorage:', error)
    return null
  }
}

export function saveStats(mood: Mood, stats: MoodStats) {
  try {
    const dataToStore: StoredStats = {
      mood,
      totalPosts: stats.totalPosts,
      totalEmojis: stats.totalEmojis,
      positiveCount: stats.positiveCount,
      neutralCount: stats.neutralCount,
      negativeCount: stats.negativeCount,
      rawSentiment: stats.rawSentiment,
      lastUpdated: Date.now(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore))
  } catch (error) {
    console.error('Failed to save stats to localStorage:', error)
  }
}

export function clearStats() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Failed to clear stats from localStorage:', error)
  }
}

export function loadStats(): StoredStats | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const data = JSON.parse(stored) as StoredStats
    // Validate the data has all required fields
    if (
      typeof data.mood?.score !== 'number' ||
      typeof data.totalPosts !== 'number' ||
      typeof data.totalEmojis !== 'number' ||
      typeof data.positiveCount !== 'number' ||
      typeof data.neutralCount !== 'number' ||
      typeof data.negativeCount !== 'number' ||
      typeof data.rawSentiment !== 'number'
    ) {
      return null
    }

    return data
  } catch (error) {
    console.error('Failed to load stats from localStorage:', error)
    return null
  }
}
