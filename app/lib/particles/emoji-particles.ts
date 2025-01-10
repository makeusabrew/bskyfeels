import { EmojiParticle } from '../types'
import { handleVerticalBounce, randomVelocityChange, seededRandom } from './utils'

export class EmojiParticleSystem {
  private particles: EmojiParticle[] = []
  private nextParticleId = 0
  private hoveredParticle: EmojiParticle | null = null
  private canvas: HTMLCanvasElement
  private mouseX = 0
  private mouseY = 0
  private boundHandleMouseMove: (e: MouseEvent) => void
  private boundHandleClick: (e: MouseEvent) => void

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // Bind event handlers once
    this.boundHandleMouseMove = this.handleMouseMove.bind(this)
    this.boundHandleClick = this.handleClick.bind(this)
    this.setupEventListeners()
  }

  private setupEventListeners() {
    // Remove any existing listeners first
    this.cleanup()

    // Ensure the canvas can receive pointer events
    this.canvas.style.pointerEvents = 'auto'

    // Add new listeners
    this.canvas.addEventListener('mousemove', this.boundHandleMouseMove)
    this.canvas.addEventListener('click', this.boundHandleClick)
    this.canvas.style.cursor = 'default'
  }

  private handleMouseMove = (e: MouseEvent) => {
    const rect = this.canvas.getBoundingClientRect()
    this.mouseX = e.clientX - rect.left
    this.mouseY = e.clientY - rect.top

    const hoveredParticle = this.findHoveredParticle()

    if (hoveredParticle !== this.hoveredParticle) {
      this.hoveredParticle = hoveredParticle
      this.canvas.style.cursor = hoveredParticle ? 'pointer' : 'default'
    }
  }

  private handleClick = (e: MouseEvent) => {
    const hoveredParticle = this.findHoveredParticle()
    if (hoveredParticle) {
      const url = `https://bsky.app/profile/${hoveredParticle.post.authorId}/post/${hoveredParticle.post.postId}`
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  private findHoveredParticle(): EmojiParticle | null {
    // Check particles in reverse order (top to bottom visually)
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const particle = this.particles[i]
      const size = 18 * particle.variation.scale // Base font size * scale
      const hitboxSize = size * 2 // Larger hitbox for better UX

      if (Math.abs(this.mouseX - particle.x) < hitboxSize && Math.abs(this.mouseY - particle.y) < hitboxSize) {
        return particle
      }
    }
    return null
  }

  addParticle(emoji: string, sentiment: number, authorId: string, postId: string) {
    const id = this.nextParticleId++

    // Convert sentiment from [-1, 1] to [0, 1] for Y positioning
    const normalizedY = (sentiment + 1) / 2

    // Add some slight randomness to prevent emojis from being exactly in line
    const randomOffset = (Math.random() - 0.5) * 0.1
    const y = this.canvas.height * (normalizedY + randomOffset)

    // More variation in x velocity
    const baseVelocity = -1.5 - Math.random() * 1 // Between -1.5 and -2.5
    const velocityVariation = (Math.random() - 0.5) * 0.5 // ±0.25

    this.particles.push({
      type: 'emoji',
      id,
      x: window.innerWidth,
      y,
      baseY: y,
      emoji,
      sentiment,
      vx: baseVelocity + velocityVariation,
      vy: (Math.random() - 0.5) * 0.3,
      variation: {
        scale: 0.4 + seededRandom(id * 3) * 0.3,
        rotate: (seededRandom(id * 4) - 0.5) * 45,
        opacity: 0.6 + seededRandom(id * 5) * 0.3,
      },
      post: {
        authorId,
        postId,
      },
    })

    if (this.particles.length > 200) {
      this.particles = this.particles.slice(-200)
    }
  }

  update() {
    this.particles = this.particles.filter((particle) => particle.x > -50)

    this.particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      const bounceResult = handleVerticalBounce(particle.y, particle.baseY, particle.vy)
      particle.y = bounceResult.y
      particle.vy = bounceResult.vy

      if (Math.random() < 0.01) {
        particle.vy = randomVelocityChange(particle.vy, 0.4)
      }
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => {
      ctx.save()
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.variation.rotate * Math.PI) / 180)
      ctx.scale(particle.variation.scale, particle.variation.scale)

      // Apply color tint based on vertical position
      const verticalPosition = particle.y / this.canvas.height
      if (verticalPosition > 0.5) {
        // Bottom half (positive) - green tint
        ctx.fillStyle = 'rgba(34, 197, 94, 0.15)'
      } else {
        // Top half (negative) - red tint
        ctx.fillStyle = 'rgba(239, 68, 68, 0.15)'
      }

      // Draw the emoji with hover effect
      ctx.globalAlpha = particle.variation.opacity * (particle === this.hoveredParticle ? 1 : 0.8)
      ctx.font = '18px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#fff'
      ctx.fillText(particle.emoji, 0, 0)

      ctx.restore()
    })
  }

  cleanup() {
    if (!this.canvas) return
    this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove)
    this.canvas.removeEventListener('click', this.boundHandleClick)
    this.canvas.style.cursor = 'default'
    this.hoveredParticle = null
  }
}
