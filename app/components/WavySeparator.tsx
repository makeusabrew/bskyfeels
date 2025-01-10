'use client'

import { useEffect, useRef } from 'react'

interface WavySeparatorProps {
  sentiment: number
}

export default function WavySeparator({ sentiment }: WavySeparatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const currentSentimentRef = useRef(sentiment)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawWave = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Smoothly interpolate between current and target sentiment
      const interpolationSpeed = 0.05
      currentSentimentRef.current += (sentiment - currentSentimentRef.current) * interpolationSpeed

      const baseY = canvas.height * (1 - (currentSentimentRef.current + 1) / 2)

      ctx.beginPath()
      ctx.moveTo(0, baseY)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * 0.01 + time * 0.002) * 20 + baseY
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, canvas.height)
      ctx.lineTo(0, canvas.height)
      ctx.closePath()

      ctx.fillStyle = 'rgba(34, 197, 94, 0.5)'
      ctx.fill()

      ctx.beginPath()
      ctx.moveTo(0, baseY)

      for (let x = 0; x < canvas.width; x++) {
        const y = Math.sin(x * 0.01 + time * 0.002) * 20 + baseY
        ctx.lineTo(x, y)
      }

      ctx.lineTo(canvas.width, 0)
      ctx.lineTo(0, 0)
      ctx.closePath()

      ctx.fillStyle = 'rgba(239, 68, 68, 0.5)'
      ctx.fill()
    }

    const animate = (time: number) => {
      drawWave(time)
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    animate(0)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [sentiment])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 5 }} />
}
