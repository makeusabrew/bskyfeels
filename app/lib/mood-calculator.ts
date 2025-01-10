import { Mood, MoodStats } from './types'

export class MoodCalculator {
  private totalPosts = 0
  private totalEmojis = 0
  private rawSentiment = 0
  private positiveCount = 0
  private neutralCount = 0
  private negativeCount = 0

  reset() {
    this.totalPosts = 0
    this.totalEmojis = 0
    this.rawSentiment = 0
    this.positiveCount = 0
    this.neutralCount = 0
    this.negativeCount = 0
  }

  restoreStats(stats: {
    totalPosts: number
    totalEmojis: number
    rawSentiment: number
    positiveCount: number
    neutralCount: number
    negativeCount: number
  }) {
    this.totalPosts = stats.totalPosts
    this.totalEmojis = stats.totalEmojis
    this.rawSentiment = stats.rawSentiment
    this.positiveCount = stats.positiveCount
    this.neutralCount = stats.neutralCount
    this.negativeCount = stats.negativeCount
  }

  incrementPostCount() {
    this.totalPosts++
  }

  updateMood(sentiment: number): Mood {
    this.totalEmojis++
    this.rawSentiment += sentiment

    if (sentiment > 0) {
      this.positiveCount++
    } else if (sentiment < 0) {
      this.negativeCount++
    } else {
      this.neutralCount++
    }

    return this.getCurrentMood()
  }

  getCurrentMood(): Mood {
    const normalizedScore = this.totalEmojis > 0 ? this.rawSentiment / this.totalEmojis : 0

    let description = 'Neutral'
    if (normalizedScore > 0.6) description = 'Ecstatic'
    else if (normalizedScore > 0.3) description = 'Happy'
    else if (normalizedScore > 0.1) description = 'Positive'
    else if (normalizedScore < -0.6) description = 'Miserable'
    else if (normalizedScore < -0.3) description = 'Sad'
    else if (normalizedScore < -0.1) description = 'Negative'

    return {
      score: normalizedScore,
      description,
    }
  }

  getMoodStats(): MoodStats {
    const mood = this.getCurrentMood()
    return {
      totalPosts: this.totalPosts,
      totalEmojis: this.totalEmojis,
      rawSentiment: this.rawSentiment,
      normalizedScore: mood.score,
      description: mood.description,
      positiveCount: this.positiveCount,
      neutralCount: this.neutralCount,
      negativeCount: this.negativeCount,
    }
  }
}
