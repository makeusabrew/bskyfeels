'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  radius: number
  color: string
  vx: number
  vy: number
  baseY: number
}

export default function SentimentBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < 100; i++) {
        const y = Math.random() * canvas.height
        particlesRef.current.push({
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

    const updateParticles = () => {
      particlesRef.current.forEach((particle) => {
        // Update positions with gentle floating motion
        particle.x += particle.vx
        particle.y += particle.vy

        // Horizontal wrapping
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0

        // Vertical bounds with gentle bounce
        const range = 50 // How far particles can move from their base position
        if (Math.abs(particle.y - particle.baseY) > range) {
          particle.vy *= -0.5 // Soft bounce
          particle.y = particle.baseY + range * Math.sign(particle.y - particle.baseY)
        }

        // Occasionally change direction for more natural movement
        if (Math.random() < 0.01) {
          particle.vx += (Math.random() - 0.5) * 0.1
          particle.vy += (Math.random() - 0.5) * 0.1

          // Limit maximum velocity
          const maxVel = 0.3
          particle.vx = Math.max(Math.min(particle.vx, maxVel), -maxVel)
          particle.vy = Math.max(Math.min(particle.vy, maxVel), -maxVel)
        }
      })
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw static background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, 'rgba(239, 68, 68, 0.5)')
      gradient.addColorStop(1, 'rgba(34, 197, 94, 0.5)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()
      })
    }

    const animate = () => {
      updateParticles()
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />
}
