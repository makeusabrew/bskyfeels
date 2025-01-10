import { CanvasRefs, JetstreamEvent, Mood, WebSocketStatus } from './types'
import { emojis } from './emoji-data'
import { BackgroundParticleSystem } from './particles/background-particles'
import { EmojiParticleSystem } from './particles/emoji-particles'
import { WaveRenderer } from './renderers/wave-renderer'
import { MoodCalculator } from './mood-calculator'
import { JetstreamConnection } from './jetstream'

export class MoodEngine {
  private backgroundParticles: BackgroundParticleSystem | null = null
  private emojiParticles: EmojiParticleSystem | null = null
  private waveRenderer: WaveRenderer | null = null
  private moodCalculator: MoodCalculator
  private jetstreamConnection: JetstreamConnection
  private animationFrame: number | null = null
  private canvases!: CanvasRefs
  private onMoodUpdate?: (mood: Mood) => void

  constructor(onMoodUpdate?: (mood: Mood) => void, onWebSocketStatusChange?: (status: WebSocketStatus) => void) {
    this.onMoodUpdate = onMoodUpdate
    this.moodCalculator = new MoodCalculator()
    this.jetstreamConnection = new JetstreamConnection(this.handleJetstreamEvent, onWebSocketStatusChange)

    // Initialize with neutral mood
    if (onMoodUpdate) {
      onMoodUpdate(this.moodCalculator.getCurrentMood())
    }
  }

  init(canvasRefs: CanvasRefs) {
    this.canvases = canvasRefs

    // Initialize systems
    if (this.canvases.background) {
      this.backgroundParticles = new BackgroundParticleSystem(this.canvases.background)
    }
    if (this.canvases.emoji) {
      this.emojiParticles = new EmojiParticleSystem(this.canvases.emoji)
    }
    if (this.canvases.wave) {
      this.waveRenderer = new WaveRenderer(this.canvases.wave)
    }

    // Set up resize handlers
    Object.values(this.canvases).forEach((canvas) => {
      if (!canvas) return
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
    })

    // Start systems
    this.jetstreamConnection.connect()
    this.startAnimation()

    return () => this.cleanup()
  }

  private handleJetstreamEvent = (event: JetstreamEvent) => {
    if (
      event.kind === 'commit' &&
      event.commit?.operation === 'create' &&
      event.commit.collection === 'app.bsky.feed.post' &&
      event.commit.record.text
    ) {
      this.moodCalculator.incrementPostCount()
      const text = event.commit.record.text
      const emojisFound = this.extractEmojis(text)

      if (emojisFound.length > 0) {
        // Process each emoji found in the post
        emojisFound.forEach((foundEmoji) => {
          const emojiData = emojis.find(([emoji]) => emoji === foundEmoji)
          if (emojiData) {
            const [emoji, sentiment] = emojiData
            const newMood = this.moodCalculator.updateMood(sentiment)
            this.onMoodUpdate?.(newMood)
            this.emojiParticles?.addParticle(emoji, sentiment)
          }
        })
      }
    }
  }

  private extractEmojis(text: string): string[] {
    // Unicode ranges for emojis
    const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
    return Array.from(new Set(text.match(emojiRegex) || []))
  }

  private cleanup() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    this.jetstreamConnection.disconnect()
    window.removeEventListener('resize', this.handleResize)
  }

  private handleResize = () => {
    Object.values(this.canvases).forEach((canvas) => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  private startAnimation() {
    const animate = (timestamp: number) => {
      this.render(timestamp)
      this.animationFrame = requestAnimationFrame(animate)
    }
    this.animationFrame = requestAnimationFrame(animate)
  }

  private render(timestamp: number) {
    // Update particle systems
    this.backgroundParticles?.update()
    this.emojiParticles?.update()

    // Render each layer
    this.renderBackground(timestamp)
    this.renderWave(timestamp)
    this.renderEmojis(timestamp)
  }

  private renderBackground(timestamp: number) {
    const canvas = this.canvases.background
    if (!canvas || !this.backgroundParticles) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.backgroundParticles.render(ctx)
  }

  private renderWave(timestamp: number) {
    const canvas = this.canvases.wave
    if (!canvas || !this.waveRenderer) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    this.waveRenderer.render(ctx, timestamp, this.moodCalculator.getCurrentMood().score)
  }

  private renderEmojis(timestamp: number) {
    const canvas = this.canvases.emoji
    if (!canvas || !this.emojiParticles) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    this.emojiParticles.render(ctx)
  }

  // For debugging/analytics
  getMoodStats() {
    return this.moodCalculator.getMoodStats()
  }
}
