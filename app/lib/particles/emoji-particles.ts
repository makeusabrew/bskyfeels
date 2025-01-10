import { EmojiParticle } from '../types'
import { handleVerticalBounce, randomVelocityChange, seededRandom } from './utils'

export class EmojiParticleSystem {
  private particles: EmojiParticle[] = []
  private nextParticleId = 0

  constructor(private canvas: HTMLCanvasElement) {}

  addParticle(emoji: string, sentiment: number) {
    const id = this.nextParticleId++

    // Convert sentiment from [-1, 1] to [0, 1] for Y positioning
    // Positive sentiment should be at bottom (higher Y values)
    const normalizedY = (sentiment + 1) / 2

    // Add some slight randomness to prevent emojis from being exactly in line
    const randomOffset = (Math.random() - 0.5) * 0.1 // ±5% of screen height
    const y = this.canvas.height * (normalizedY + randomOffset)

    this.particles.push({
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

    // Keep particle count manageable
    if (this.particles.length > 200) {
      this.particles = this.particles.slice(-200)
    }
  }

  update() {
    this.particles = this.particles.filter((particle) => particle.x > -50)

    this.particles.forEach((particle) => {
      // Update particle position
      particle.x += particle.vx
      particle.y += particle.vy

      // Handle vertical bounce
      const bounceResult = handleVerticalBounce(particle.y, particle.baseY, particle.vy)
      particle.y = bounceResult.y
      particle.vy = bounceResult.vy

      // Random direction changes (vertical only)
      if (Math.random() < 0.01) {
        particle.vy = randomVelocityChange(particle.vy)
      }
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    this.particles.forEach((particle) => {
      const variation = {
        yOffset: (seededRandom(particle.id) - 0.5) * 20,
        scale: 0.75 + seededRandom(particle.id * 3) * 0.5,
        rotate: (seededRandom(particle.id * 4) - 0.5) * 30,
        opacity: 0.7 + seededRandom(particle.id * 5) * 0.3,
      }

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
}
