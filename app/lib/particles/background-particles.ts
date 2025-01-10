import { BackgroundParticle } from '../types'
import { handleVerticalBounce, randomVelocityChange } from './utils'

export class BackgroundParticleSystem {
  private particles: BackgroundParticle[] = []
  private nextParticleId = 0
  private canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    // Delay initialization to ensure canvas is ready
    requestAnimationFrame(() => this.initParticles())
  }

  private initParticles() {
    // Ensure canvas dimensions are set
    if (!this.canvas.width || !this.canvas.height) {
      this.canvas.width = window.innerWidth
      this.canvas.height = window.innerHeight
    }

    const width = this.canvas.width
    const height = this.canvas.height

    this.particles = []
    for (let i = 0; i < 100; i++) {
      const y = Math.random() * height
      this.particles.push({
        type: 'background',
        id: this.nextParticleId++,
        x: Math.random() * width,
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
    const width = this.canvas.width
    const height = this.canvas.height

    // If canvas dimensions are invalid, try to reinitialize
    if (!width || !height) {
      this.initParticles()
      return
    }

    this.particles.forEach((particle) => {
      // Update positions
      particle.x += particle.vx
      particle.y += particle.vy

      // Wrap horizontally
      if (particle.x < 0) particle.x = width
      if (particle.x > width) particle.x = 0

      // Keep particles within vertical bounds
      if (particle.y < 0) {
        particle.y = 0
        particle.vy = Math.abs(particle.vy) * 0.5
      }
      if (particle.y > height) {
        particle.y = height
        particle.vy = -Math.abs(particle.vy) * 0.5
      }

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
    const width = this.canvas.width
    const height = this.canvas.height

    // If canvas dimensions are invalid, try to reinitialize
    if (!width || !height) {
      this.initParticles()
      return
    }

    // Draw background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)')
    gradient.addColorStop(1, 'rgba(34, 197, 94, 0.5)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Draw particles
    this.particles.forEach((particle) => {
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particle.color
      ctx.fill()
    })
  }

  handleResize() {
    // Store current particles' relative positions
    const oldWidth = this.canvas.width || window.innerWidth
    const oldHeight = this.canvas.height || window.innerHeight

    // Update canvas dimensions
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight

    // Scale particle positions to new dimensions
    this.particles.forEach((particle) => {
      particle.x = (particle.x / oldWidth) * this.canvas.width
      particle.y = (particle.y / oldHeight) * this.canvas.height
      particle.baseY = (particle.baseY / oldHeight) * this.canvas.height
    })
  }
}
