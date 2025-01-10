import { EmojiParticle } from '../types'
import { handleVerticalBounce, randomVelocityChange, seededRandom } from './utils'

export class EmojiParticleSystem {
  private particles: EmojiParticle[] = []
  private nextParticleId = 0

  constructor(private canvas: HTMLCanvasElement) {}

  addParticle(emoji: string, sentiment: number) {
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

      // Draw the emoji
      ctx.globalAlpha = particle.variation.opacity
      ctx.font = '18px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#fff'
      ctx.fillText(particle.emoji, 0, 0)

      ctx.restore()
    })
  }
}
