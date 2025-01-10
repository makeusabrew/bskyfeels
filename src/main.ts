interface Mood {
  score: number
  description: string
}

class BlueSkyMood {
  private ws: WebSocket
  private mood: Mood = { score: 0, description: 'Neutral' }
  private emojiStream: EmojiStreamRenderer
  private background: BackgroundRenderer
  private waveSeparator: WaveSeparatorRenderer
  private moodDisplay: MoodDisplayRenderer

  constructor() {
    // Initialize renderers
    this.emojiStream = new EmojiStreamRenderer()
    this.background = new BackgroundRenderer()
    this.waveSeparator = new WaveSeparatorRenderer()
    this.moodDisplay = new MoodDisplayRenderer()

    // Set up WebSocket
    this.ws = new WebSocket('wss://bsky-stream.example.com')
    this.ws.onmessage = this.handleMessage.bind(this)

    // Start animation loop
    requestAnimationFrame(this.render.bind(this))
  }

  private handleMessage(event: MessageEvent) {
    const data = JSON.parse(event.data)
    // Process emoji/sentiment data
    // Update mood score
    this.updateMood(data)
  }

  private updateMood(data: any) {
    // Update mood calculations
    this.mood.score = this.mood.score * 0.95 + data.sentiment * 0.05
    this.mood.description = this.getDescriptionFromScore(this.mood.score)
  }

  private render(timestamp: number) {
    // Update all renderers
    this.background.render(timestamp)
    this.waveSeparator.render(timestamp, this.mood.score)
    this.emojiStream.render(timestamp)
    this.moodDisplay.render(this.mood)

    requestAnimationFrame(this.render.bind(this))
  }
}
