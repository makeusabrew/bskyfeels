export class WaveRenderer {
  private currentSentiment = 0

  constructor(private canvas: HTMLCanvasElement) {}

  render(ctx: CanvasRenderingContext2D, timestamp: number, targetSentiment: number) {
    // Smooth transition for wave position
    const interpolationSpeed = 0.05
    this.currentSentiment += (targetSentiment - this.currentSentiment) * interpolationSpeed

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    const baseY = this.canvas.height * (1 - (this.currentSentiment + 1) / 2)

    this.renderWave(ctx, baseY, timestamp)
  }

  private renderWave(ctx: CanvasRenderingContext2D, baseY: number, timestamp: number) {
    // Draw wave
    ctx.beginPath()
    ctx.moveTo(0, baseY)

    for (let x = 0; x < this.canvas.width; x++) {
      const y = Math.sin(x * 0.01 + timestamp * 0.002) * 20 + baseY
      ctx.lineTo(x, y)
    }

    // Fill bottom area (positive sentiment)
    ctx.lineTo(this.canvas.width, this.canvas.height)
    ctx.lineTo(0, this.canvas.height)
    ctx.closePath()
    ctx.fillStyle = 'rgba(251, 146, 60, 0.5)'
    ctx.fill()

    // Fill top area (negative sentiment)
    ctx.beginPath()
    ctx.moveTo(0, baseY)
    for (let x = 0; x < this.canvas.width; x++) {
      const y = Math.sin(x * 0.01 + timestamp * 0.002) * 20 + baseY
      ctx.lineTo(x, y)
    }
    ctx.lineTo(this.canvas.width, 0)
    ctx.lineTo(0, 0)
    ctx.closePath()
    ctx.fillStyle = 'rgba(45, 212, 191, 0.5)'
    ctx.fill()
  }
}
