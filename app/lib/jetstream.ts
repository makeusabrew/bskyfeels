import { JetstreamEvent } from './types'

export class JetstreamConnection {
  private ws: WebSocket | null = null
  private wsRetryCount = 0
  private readonly MAX_RETRIES = 3
  private readonly JETSTREAM_URLS = [
    'wss://jetstream1.us-east.bsky.network',
    'wss://jetstream2.us-east.bsky.network',
    'wss://jetstream1.us-west.bsky.network',
    'wss://jetstream2.us-west.bsky.network',
  ]

  constructor(private onMessage: (event: JetstreamEvent) => void) {}

  connect() {
    const url = `${this.JETSTREAM_URLS[this.wsRetryCount]}/subscribe?wantedCollections=app.bsky.feed.post`

    this.ws = new WebSocket(url)

    this.ws.onmessage = (event) => {
      try {
        const jetstreamEvent = JSON.parse(event.data) as JetstreamEvent
        this.onMessage(jetstreamEvent)
      } catch (error) {
        console.error('Error processing message:', error)
      }
    }

    this.ws.onclose = () => {
      console.log('WebSocket closed, attempting reconnect...')
      this.wsRetryCount = (this.wsRetryCount + 1) % this.JETSTREAM_URLS.length
      setTimeout(() => this.connect(), 1000)
    }

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      this.ws?.close()
    }
  }

  disconnect() {
    this.ws?.close()
  }
}
