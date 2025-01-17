export interface Mood {
  score: number
  description: string
}

export interface BaseParticle {
  x: number
  y: number
  id: number
  vx: number
  vy: number
  baseY: number
}

export interface BackgroundParticle extends BaseParticle {
  type: 'background'
  radius: number
  color: string
}

export interface EmojiParticle extends BaseParticle {
  type: 'emoji'
  emoji: string
  sentiment: number
  variation: {
    scale: number
    rotate: number
    opacity: number
  }
  post: {
    authorId: string
    postId: string
  }
}

export type Particle = BackgroundParticle | EmojiParticle

export interface MoodStats {
  totalPosts: number
  totalEmojis: number
  rawSentiment: number
  normalizedScore: number
  description: string
  positiveCount: number
  neutralCount: number
  negativeCount: number
}

export interface JetstreamEvent {
  did: string
  time_us: number
  kind: string
  commit?: {
    operation: string
    collection: string
    rkey?: string
    record: {
      $type: string
      text?: string
    }
  }
}

export interface CanvasRefs {
  background: HTMLCanvasElement
  wave: HTMLCanvasElement
  emoji: HTMLCanvasElement
}

export type WebSocketStatus = 'connecting' | 'connected' | 'disconnected'

export interface WaveTheme {
  name: string
  positive: string
  negative: string
}

export type WaveThemeName = 'classic' | 'purple-dream' | 'sunset' | 'ocean' | 'forest' | 'midnight' | 'aurora' | 'candy'
