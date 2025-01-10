import { BackgroundParticle } from '../types'
import { handleVerticalBounce, randomVelocityChange } from './utils'

export class BackgroundParticleSystem {
  private particles: BackgroundParticle[] = []
  private nextParticleId = 0

  constructor(private canvas: HTMLCanvasElement) {
    this.initParticles()
  }

  private initParticles() {
    this.particles = []
    for (let i = 0; i < 100; i++) {
      const y = Math.random() * this.canvas.height
      this.particles.push({
        type: 'background',
        id: this.nextParticleId++,
        x: Math.random() * this.canvas.width,
        y,
        baseY: y,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)',
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      })
    }
  }

  update() {
    this.particles.forEach((particle) => {
      // Update positions
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap horizontally
      if (particle.x < 0) particle.x = this.canvas.width
      if (particle.x > this.canvas.width) particle.x = 0

      // Handle vertical bounce
      const bounceResult = handleVerticalBounce(particle.y, particle.baseY, particle.vy)
      particle.y = bounceResult.y
      particle.vy = bounceResult.vy

      // Random direction changes
      if (Math.random() < 0.01) {
        particle.vx = randomVelocityChange(particle.vx)
        particle.vy = randomVelocityChange(particle.vy)
      }
    })
  }

  render(ctx: CanvasRenderingContext2D) {
    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, this.canvas.height)
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)')
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.5)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw particles
    this.particles.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })
  }

  handleResize() {
    this.initParticles()
  }
}
