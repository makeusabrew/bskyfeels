import { Mood, MoodStats } from './types'

export class MoodCalculator {
  private rawSentiment = 0
  private totalEmojisProcessed = 0
  private positiveCount = 0
  private neutralCount = 0
  private negativeCount = 0
  private totalPostsProcessed = 0
  private currentMood: Mood = { score: 0, description: 'Neutral' }

  updateMood(sentiment: number) {
    // Update raw sentiment (unbounded)
    this.rawSentiment += sentiment
    this.totalEmojisProcessed++

    // Update counts
    if (sentiment > 0.1) this.positiveCount++
    else if (sentiment < -0.1) this.negativeCount++
    else this.neutralCount++

    // Calculate normalized score for display/rendering
    // Using tanh to smoothly constrain to -1...+1 range while allowing extremes
    const normalizedScore = Math.tanh(this.rawSentiment / Math.max(20, this.totalEmojisProcessed))

    this.currentMood = {
      score: normalizedScore,
      description: this.getDescriptionFromScore(normalizedScore),
    }

    return this.currentMood
  }

  incrementPostCount() {
    this.totalPostsProcessed++
  }

  getCurrentMood(): Mood {
    return this.currentMood
  }

  getMoodStats(): MoodStats {
    return {
      totalPosts: this.totalPostsProcessed,
      totalEmojis: this.totalEmojisProcessed,
      rawSentiment: this.rawSentiment,
      normalizedScore: this.currentMood.score,
      description: this.currentMood.description,
      positiveCount: this.positiveCount,
      neutralCount: this.neutralCount,
      negativeCount: this.negativeCount,
    }
  }

  private getDescriptionFromScore(score: number): string {
    if (score > 0.5) return 'Ecstatic'
    if (score > 0.3) return 'Happy'
    if (score > 0.1) return 'Positive'
    if (score > -0.1) return 'Neutral'
    if (score > -0.3) return 'Uneasy'
    if (score > -0.5) return 'Sad'
    return 'Gloomy'
  }
}
