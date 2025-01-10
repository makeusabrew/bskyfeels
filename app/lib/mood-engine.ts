export interface Mood {
  score: number
  description: string
}

interface BaseParticle {
  x: number
  y: number
  id: number
  vx: number
  vy: number
  baseY: number
}

interface BackgroundParticle extends BaseParticle {
  type: 'background'
  radius: number
  color: string
}

interface EmojiParticle extends BaseParticle {
  type: 'emoji'
  emoji: string
  sentiment: number
}

type Particle = BackgroundParticle | EmojiParticle

// Deterministic random number generator for consistent particle behavior
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}
const emojis: [string, number][] = [
  ['😀', 0.8], // Very happy
  ['😃', 0.7], // Happy
  ['😄', 0.8], // Very happy
  ['😁', 0.9], // Very happy
  ['😆', 0.7], // Happy
  ['😅', 0.5], // Slightly happy
  ['😂', 0.6], // Happy
  ['🤣', 0.6], // Happy
  ['😊', 0.7], // Happy
  ['😇', 0.8], // Very happy
  ['🙂', 0.3], // Slightly happy
  ['🙃', 0.1], // Neutral-ish
  ['😉', 0.4], // Slightly happy
  ['😌', 0.2], // Slightly positive
  ['😍', 0.9], // Very happy
  ['🥰', 1.0], // Maximum happiness
  ['😘', 0.8], // Very happy
  ['😗', 0.4], // Slightly happy
  ['😙', 0.5], // Moderately happy
  ['😚', 0.6], // Happy
  ['😋', 0.7], // Happy
  ['😛', 0.4], // Playful positive
  ['😝', 0.3], // Playful positive
  ['😜', 0.3], // Playful positive
  ['🤪', 0.2], // Chaotic neutral
  ['🤨', -0.2], // Slightly negative
  ['🧐', 0.0], // Neutral
  ['🤓', 0.2], // Slightly positive
  ['😎', 0.6], // Cool positive
  ['🤩', 0.9], // Very happy
  ['🥳', 0.8], // Very happy
  ['😏', 0.1], // Slightly smug
  ['😒', -0.4], // Negative
  ['😞', -0.7], // Very negative
  ['😔', -0.6], // Negative
  ['😟', -0.5], // Worried
  ['😕', -0.3], // Slightly negative
  ['🙁', -0.4], // Negative
  ['☹️', -0.6], // Negative
  ['😣', -0.7], // Very negative
  ['😖', -0.8], // Very negative
  ['😫', -0.7], // Very negative
  ['😩', -0.6], // Negative
  ['🥺', -0.3], // Pleading/sad
  ['😢', -0.7], // Very negative
  ['😭', -0.9], // Maximum sadness
  ['😤', -0.5], // Angry
  ['😠', -0.7], // Very angry
  ['😡', -0.8], // Very angry
  ['🤬', -1.0], // Maximum anger
  ['🤯', -0.4], // Overwhelmed
  ['😳', -0.2], // Surprised/shocked
  ['🥵', -0.3], // Hot/uncomfortable
  ['🥶', -0.3], // Cold/uncomfortable
  ['😱', -0.8], // Very scared
  ['😨', -0.6], // Scared
  ['😰', -0.5], // Worried
  ['😥', -0.4], // Sad
  ['😓', -0.5], // Negative
  ['🤗', 0.6], // Happy/hugging
  ['🤔', 0.0], // Neutral thinking
  ['🤭', 0.3], // Slightly amused
  ['🤫', 0.0], // Neutral
  ['🤥', -0.3], // Slightly negative
  ['😶', 0.0], // Neutral
  ['😐', 0.0], // Neutral
  ['😑', -0.1], // Slightly annoyed
  ['😬', -0.2], // Uncomfortable
  ['🙄', -0.3], // Annoyed
  ['😯', 0.0], // Surprised neutral
  ['😦', -0.4], // Negative
  ['😧', -0.5], // Negative
  ['😮', -0.1], // Surprised
  ['😲', -0.2], // Shocked
  ['🥱', -0.2], // Tired
  ['😴', 0.1], // Peaceful sleep
  ['🤤', 0.2], // Content
  ['😪', -0.1], // Tired
  ['😵', -0.4], // Negative
  ['🤐', -0.2], // Slightly negative
  ['🥴', -0.3], // Woozy
  ['🤢', -0.8], // Very negative
  ['🤮', -0.9], // Very negative
  ['🤧', -0.3], // Slightly negative
  ['😷', -0.2], // Slightly negative
  ['🤒', -0.5], // Negative
  ['🤕', -0.6], // Negative
]

export class MoodEngine {
  private ws!: WebSocket // Using definite assignment assertion
  private mood: Mood = { score: 0, description: 'Neutral' }
  private canvases: {
    background: HTMLCanvasElement | null
    wave: HTMLCanvasElement | null
    emoji: HTMLCanvasElement | null
  } = {
    background: null,
    wave: null,
    emoji: null,
  }
  private animationFrame: number | null = null
  private onMoodUpdate?: (mood: Mood) => void
  private backgroundParticles: BackgroundParticle[] = []
  private emojiParticles: EmojiParticle[] = []
  private nextParticleId = 0
  private currentSentiment = 0 // For smooth wave transitions

  constructor(onMoodUpdate?: (mood: Mood) => void) {
    this.onMoodUpdate = onMoodUpdate
  }

  init(canvasRefs: { background: HTMLCanvasElement; wave: HTMLCanvasElement; emoji: HTMLCanvasElement }) {
    this.canvases = canvasRefs

    // Initialize all canvases to full viewport size
    Object.values(this.canvases).forEach((canvas) => {
      if (!canvas) return
      const resizeCanvas = () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        if (canvas === this.canvases.background) {
          this.initBackgroundParticles()
        }
      }
      resizeCanvas()
      window.addEventListener('resize', resizeCanvas)
    })

    // Initialize background particles
    this.initBackgroundParticles()

    // Simulate WebSocket with interval
    // TODO: Replace with actual WebSocket connection
    this.ws = setInterval(() => {
      const [emoji, sentiment] = emojis[Math.floor(Math.random() * emojis.length)]
      this.handleMessage({
        data: JSON.stringify({
          emoji,
          sentiment,
        }),
      } as any)
    }, 1000) as any

    this.startAnimation()
    return () => this.cleanup()
  }

  private cleanup() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    clearInterval(this.ws as any)
    window.removeEventListener('resize', this.handleResize)
  }

  private handleResize = () => {
    Object.values(this.canvases).forEach((canvas) => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    })
  }

  private handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data)
    this.updateMood(data)
    this.addEmojiParticle(data.emoji, data.sentiment)
  }

  private initBackgroundParticles() {
    const canvas = this.canvases.background
    if (!canvas) return

    this.backgroundParticles = []
    for (let i = 0; i < 100; i++) {
      const y = Math.random() * canvas.height
      this.backgroundParticles.push({
        type: 'background',
        id: this.nextParticleId++,
        x: Math.random() * canvas.width,
        y,
        baseY: y,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      })
    }
  }

  private addEmojiParticle(emoji: string, sentiment: number) {
    const id = this.nextParticleId++
    const y = Math.random() * (this.canvases.emoji?.height || 0)

    this.emojiParticles.push({
      type: 'emoji',
      id,
      x: window.innerWidth,
      y,
      baseY: y,
      emoji,
      sentiment,
      vx: -2,
      vy: (Math.random() - 0.5) * 0.2,
    })

    if (this.emojiParticles.length > 100) {
      this.emojiParticles = this.emojiParticles.slice(-100)
    }
  }

  private updateMood(data: any) {
    this.mood.score = this.mood.score * 0.95 + data.sentiment * 0.05
    this.mood.description = this.getDescriptionFromScore(this.mood.score)
    this.onMoodUpdate?.(this.mood)
  }

  private renderBackground(timestamp: number) {
    const canvas = this.canvases.background
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)')
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.5)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Update and draw background particles
    this.backgroundParticles.forEach((particle) => {
      // Update positions
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap horizontally
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0

      // Bounce vertically with dampening
      const range = 50
      if (Math.abs(particle.y - particle.baseY) > range) {
        particle.vy *= -0.5
        particle.y = particle.baseY + range * Math.sign(particle.y - particle.baseY)
      }

      // Random direction changes
      if (Math.random() < 0.01) {
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1
        const maxVel = 0.3
        particle.vx = Math.max(Math.min(particle.vx, maxVel), -maxVel)
        particle.vy = Math.max(Math.min(particle.vy, maxVel), -maxVel)
      }

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })
  }

  private renderWave(timestamp: number) {
    const canvas = this.canvases.wave
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Smooth transition for wave position
    const interpolationSpeed = 0.05
    this.currentSentiment += (this.mood.score - this.currentSentiment) * interpolationSpeed

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const baseY = canvas.height * (1 - (this.currentSentiment + 1) / 2)

    // Draw wave
    ctx.beginPath()
    ctx.moveTo(0, baseY)

    for (let x = 0; x < canvas.width; x++) {
      const y = Math.sin(x * 0.01 + timestamp * 0.002) * 20 + baseY
      ctx.lineTo(x, y)
    }

    // Fill bottom area (positive sentiment)
    ctx.lineTo(canvas.width, canvas.height)
    ctx.lineTo(0, canvas.height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(34, 197, 94, 0.5)'
    ctx.fill()

    // Fill top area (negative sentiment)
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    for (let x = 0; x < canvas.width; x++) {
      const y = Math.sin(x * 0.01 + timestamp * 0.002) * 20 + baseY
      ctx.lineTo(x, y)
    }
    ctx.lineTo(canvas.width, 0)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.fillStyle = 'rgba(239, 68, 68, 0.5)'
    ctx.fill()
  }

  private renderEmojiStream(timestamp: number) {
    const canvas = this.canvases.emoji
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    this.emojiParticles = this.emojiParticles.filter((particle) => particle.x > -50)

    this.emojiParticles.forEach((particle) => {
      const variation = {
        yOffset: (seededRandom(particle.id) - 0.5) * 20,
        scale: 0.75 + seededRandom(particle.id * 3) * 0.5,
        rotate: (seededRandom(particle.id * 4) - 0.5) * 30,
        opacity: 0.7 + seededRandom(particle.id * 5) * 0.3,
      }

      // Update particle position
      particle.x += particle.vx
      particle.y += particle.vy

      // Remove particles that have moved off screen
      if (particle.x < -50) {
        this.emojiParticles = this.emojiParticles.filter((p) => p.id !== particle.id)
        return
      }

      // Bounce vertically with dampening
      const range = 50
      if (Math.abs(particle.y - particle.baseY) > range) {
        particle.vy *= -0.5
        particle.y = particle.baseY + range * Math.sign(particle.y - particle.baseY)
      }

      // Random direction changes (vertical only)
      if (Math.random() < 0.01) {
        particle.vy += (Math.random() - 0.5) * 0.1
        const maxVel = 0.3
        particle.vy = Math.max(Math.min(particle.vy, maxVel), -maxVel)
      }

      // Draw emoji
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((variation.rotate * Math.PI) / 180)
      ctx.scale(variation.scale, variation.scale)
      ctx.globalAlpha = variation.opacity
      ctx.font = '24px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(particle.emoji, 0, 0)
      ctx.restore()
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
    if (!this.canvases.background || !this.canvases.wave || !this.canvases.emoji) return

    this.renderBackground(timestamp)
    this.renderWave(timestamp)
    this.renderEmojiStream(timestamp)
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
