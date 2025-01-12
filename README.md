# Hey Bluesky, how ya feeling? ☺️

Unscientific sentiment analysis of the Bluesky firehose to visualise the mood on Bluesky, in realtime, direct from your browser:

<img width="1110" alt="image" src="https://github.com/user-attachments/assets/b659a54d-5fb0-4120-bdc1-51468b91dc6b" />

## How it works

* Rank a list of well-known emojis with a sentiment score between -1 (extremely negative) and +1 (extremely positive)
* Connect to the Bluesky Jetstream firehose WebSocket service direct from your browser and consume all posts
* Extract emojis, not text (pictures speak a thousand words, right? I warned you it was unscientific) from each post
* Add the sentiment value from each new emoji to an overall sentiment score
* Visualise positive and negative as two waves pushing against each other, and stream each emoji in realtime from right to left, positioned according to sentiment value

## About

### About me

[I](https://bsky.app/profile/makeusabrew.bsky.social) really like Bluesky. I love the openness of its APIs, particularly access to the firehose. [I've built stuff on top of it before](https://news.thundersky.app/).
I love fast-moving data streams, and I love visualisations. I'm bad at the latter, but the current crop of generative AI tools do a great job of masking those shortcomings. Thanks, AI!

* Follow me on Bluesky: [@makeusabrew](https://bsky.app/profile/makeusabrew.bsky.social)
* Hire me to build something for you: [stronglytyped.uk](https://stronglytyped.uk/)
* Book a 15 minute chat with me about something: https://cal.com/nick-payne-9eytpe/intro

### About the build

99% of this code was written by AI, instructed by me. The code isn't how I'd write it, but it works. I knew I wanted to do some lo-fi sentiment analysis of the Bluesky firehose, and I knew roughly how I wanted to visualise it (with a positive and negative side fighting one another). That was it.
From there, my workflow was:

* ChatGPT: idea generation and refinement
* v0.dev: initial visualisation mockup
* Cursor composer: build

I didn't time things end-to-end including my chinwag with ChatGPT, but from v0 to live site took me a Friday afternoon. This is the magic of AI: from zero to live in hours.

## Running the app

* Clone this repository
* `npm install`
* `npm run dev`

The `app/page.tsx` component is your jumping off point. Technically the app is a NextJS / React app, but that's mostly just for wiring things together - the core
app logic lives in `lib/`.

## License

### The MIT license

Copyright 2025 Nick Payne (nick@stronglytyped.uk).
