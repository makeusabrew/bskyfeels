export const emojis: [string, number][] = [
  ['😀', 0.8], // Very happy
  ['😃', 0.7], // Happy
  ['😄', 0.8], // Very happy
  ['😁', 0.9], // Very happy
  ['😆', 0.7], // Happy
  ['😅', 0.5], // Slightly happy
  ['😂', 0.6], // Happy
  ['🤣', 0.6], // Happy
  ['😊', 0.7], // Happy
  ['😇', 0.8], // Very happy
  ['🙂', 0.3], // Slightly happy
  ['🙃', 0.1], // Neutral-ish
  ['😉', 0.4], // Slightly happy
  ['😌', 0.2], // Slightly positive
  ['😍', 0.9], // Very happy
  ['🥰', 1.0], // Maximum happiness
  ['😘', 0.8], // Very happy
  ['😗', 0.4], // Slightly happy
  ['😙', 0.5], // Moderately happy
  ['😚', 0.6], // Happy
  ['😋', 0.7], // Happy
  ['😛', 0.4], // Playful positive
  ['😝', 0.3], // Playful positive
  ['😜', 0.3], // Playful positive
  ['🤪', 0.2], // Chaotic neutral
  ['🤨', -0.2], // Slightly negative
  ['🧐', 0.0], // Neutral
  ['🤓', 0.2], // Slightly positive
  ['😎', 0.6], // Cool positive
  ['🤩', 0.9], // Very happy
  ['🥳', 0.8], // Very happy
  ['😏', 0.1], // Slightly smug
  ['😒', -0.4], // Negative
  ['😞', -0.7], // Very negative
  ['😔', -0.6], // Negative
  ['😟', -0.5], // Worried
  ['😕', -0.3], // Slightly negative
  ['🙁', -0.4], // Negative
  ['☹️', -0.6], // Negative
  ['😣', -0.7], // Very negative
  ['😖', -0.8], // Very negative
  ['😫', -0.7], // Very negative
  ['😩', -0.6], // Negative
  ['🥺', -0.3], // Pleading/sad
  ['😢', -0.7], // Very negative
  ['😭', -0.9], // Maximum sadness
  ['😤', -0.5], // Angry
  ['😠', -0.7], // Very angry
  ['😡', -0.8], // Very angry
  ['🤬', -1.0], // Maximum anger
  ['🤯', -0.4], // Overwhelmed
  ['😳', -0.2], // Surprised/shocked
  ['🥵', -0.3], // Hot/uncomfortable
  ['🥶', -0.3], // Cold/uncomfortable
  ['😱', -0.8], // Very scared
  ['😨', -0.6], // Scared
  ['😰', -0.5], // Worried
  ['😥', -0.4], // Sad
  ['😓', -0.5], // Negative
  ['🤗', 0.6], // Happy/hugging
  ['🤔', 0.0], // Neutral thinking
  ['🤭', 0.3], // Slightly amused
  ['🤫', 0.0], // Neutral
  ['🤥', -0.3], // Slightly negative
  ['😶', 0.0], // Neutral
  ['😐', 0.0], // Neutral
  ['😑', -0.1], // Slightly annoyed
  ['😬', -0.2], // Uncomfortable
  ['🙄', -0.3], // Annoyed
  ['😯', 0.0], // Surprised neutral
  ['😦', -0.4], // Negative
  ['😧', -0.5], // Negative
  ['😮', -0.1], // Surprised
  ['😲', -0.2], // Shocked
  ['🥱', -0.2], // Tired
  ['😴', 0.1], // Peaceful sleep
  ['🤤', 0.2], // Content
  ['😪', -0.1], // Tired
  ['😵', -0.4], // Negative
  ['🤐', -0.2], // Slightly negative
  ['🥴', -0.3], // Woozy
  ['🤢', -0.8], // Very negative
  ['🤮', -0.9], // Very negative
  ['🤧', -0.3], // Slightly negative
  ['😷', -0.2], // Slightly negative
  ['🤒', -0.5], // Negative
  ['🤕', -0.6], // Negative
  // Hearts and Love
  ['❤️', 0.9], // Love
  ['🧡', 0.8], // Love
  ['💛', 0.8], // Love
  ['💚', 0.8], // Love
  ['💙', 0.8], // Love
  ['💜', 0.8], // Love
  ['🖤', 0.4], // Edgy love
  ['🤍', 0.7], // Pure love
  ['🤎', 0.7], // Love
  ['💔', -0.8], // Heartbreak
  ['❤️‍🔥', 0.9], // Passionate love
  ['❤️‍🩹', 0.3], // Healing love
  ['💖', 0.9], // Sparkling love
  ['💗', 0.8], // Growing love
  ['💓', 0.8], // Beating love
  ['💞', 0.9], // Revolving hearts
  ['💕', 0.9], // Two hearts
  ['💝', 0.9], // Heart with ribbon
  // Hand gestures (including all skin tones)
  ['👍', 0.6], // Approval (base)
  ['👍🏻', 0.6], // Light skin tone
  ['👍🏼', 0.6], // Medium-light skin tone
  ['👍🏽', 0.6], // Medium skin tone
  ['👍🏾', 0.6], // Medium-dark skin tone
  ['👍🏿', 0.6], // Dark skin tone

  ['👎', -0.6], // Disapproval (base)
  ['👎🏻', -0.6], // Light skin tone
  ['👎🏼', -0.6], // Medium-light skin tone
  ['👎🏽', -0.6], // Medium skin tone
  ['👎🏾', -0.6], // Medium-dark skin tone
  ['👎🏿', -0.6], // Dark skin tone

  ['👊', 0.3], // Fist bump (base)
  ['👊🏻', 0.3], // Light skin tone
  ['👊🏼', 0.3], // Medium-light skin tone
  ['👊🏽', 0.3], // Medium skin tone
  ['👊🏾', 0.3], // Medium-dark skin tone
  ['👊🏿', 0.3], // Dark skin tone

  ['🤝', 0.7], // Agreement (base - mixed)

  ['🙏', 0.7], // Please/Thank you (base)
  ['🙏🏻', 0.7], // Light skin tone
  ['🙏🏼', 0.7], // Medium-light skin tone
  ['🙏🏽', 0.7], // Medium skin tone
  ['🙏🏾', 0.7], // Medium-dark skin tone
  ['🙏🏿', 0.7], // Dark skin tone

  ['🫂', 0.8], // Hug (base - mixed)

  ['👏', 0.7], // Applause (base)
  ['👏🏻', 0.7], // Light skin tone
  ['👏🏼', 0.7], // Medium-light skin tone
  ['👏🏽', 0.7], // Medium skin tone
  ['👏🏾', 0.7], // Medium-dark skin tone
  ['👏🏿', 0.7], // Dark skin tone

  ['🙌', 0.8], // Celebration (base)
  ['🙌🏻', 0.8], // Light skin tone
  ['🙌🏼', 0.8], // Medium-light skin tone
  ['🙌🏽', 0.8], // Medium skin tone
  ['🙌🏾', 0.8], // Medium-dark skin tone
  ['🙌🏿', 0.8], // Dark skin tone

  ['✌️', 0.6], // Peace (base)
  ['✌🏻', 0.6], // Light skin tone
  ['✌🏼', 0.6], // Medium-light skin tone
  ['✌🏽', 0.6], // Medium skin tone
  ['✌🏾', 0.6], // Medium-dark skin tone
  ['✌🏿', 0.6], // Dark skin tone

  ['🤟', 0.7], // Love gesture (base)
  ['🤟🏻', 0.7], // Light skin tone
  ['🤟🏼', 0.7], // Medium-light skin tone
  ['🤟🏽', 0.7], // Medium skin tone
  ['🤟🏾', 0.7], // Medium-dark skin tone
  ['🤟🏿', 0.7], // Dark skin tone

  ['🤘', 0.6], // Rock on (base)
  ['🤘🏻', 0.6], // Light skin tone
  ['🤘🏼', 0.6], // Medium-light skin tone
  ['🤘🏽', 0.6], // Medium skin tone
  ['🤘🏾', 0.6], // Medium-dark skin tone
  ['🤘🏿', 0.6], // Dark skin tone

  ['👋', 0.4], // Wave (base)
  ['👋🏻', 0.4], // Light skin tone
  ['👋🏼', 0.4], // Medium-light skin tone
  ['👋🏽', 0.4], // Medium skin tone
  ['👋🏾', 0.4], // Medium-dark skin tone
  ['👋🏿', 0.4], // Dark skin tone
  // Additional expressions
  ['🥹', 0.4], // Holding back tears (happy)
  ['🫠', 0.2], // Melting face
  ['🫡', 0.3], // Saluting face
  ['🫢', 0.2], // Peeking eye
  ['🫣', 0.1], // Covering eyes
  ['🥲', 0.2], // Smiling through pain
  // Animals often used for reactions
  ['🦋', 0.6], // Butterfly (positive transformation)
  ['🐛', 0.2], // Bug (small/cute)
  ['🦄', 0.8], // Unicorn (magical/special)
  ['🐥', 0.6], // Baby chick (cute)
  // Nature and weather moods
  ['✨', 0.7], // Sparkles
  ['💫', 0.6], // Dizzy
  ['⭐', 0.7], // Star
  ['🌟', 0.8], // Glowing star
  ['☀️', 0.7], // Sun
  ['🌧️', -0.3], // Rain
  ['⛈️', -0.5], // Storm
  // Miscellaneous
  ['💯', 0.8], // 100 points
  ['🔥', 0.7], // Fire (hot/awesome)
  ['💪', 0.7], // Strength
  ['🎉', 0.9], // Party
  ['✅', 0.6], // Check mark
  ['❌', -0.6], // Cross mark
]
