import { WaveTheme, WaveThemeName } from './types'

export const waveThemes: Record<WaveThemeName, WaveTheme> = {
  classic: {
    name: 'Classic',
    positive: 'rgba(34, 197, 94, 0.6)',
    negative: 'rgba(239, 68, 68, 0.6)',
  },
  'purple-dream': {
    name: 'Dream',
    positive: 'rgba(147, 51, 234, 0.5)',
    negative: 'rgba(59, 130, 246, 0.5)',
  },
  sunset: {
    name: 'Sunset',
    positive: 'rgba(251, 146, 60, 0.5)',
    negative: 'rgba(45, 212, 191, 0.5)',
  },
  ocean: {
    name: 'Ocean',
    positive: 'rgba(56, 189, 248, 0.5)',
    negative: 'rgba(236, 72, 153, 0.5)',
  },
  forest: {
    name: 'Forest',
    positive: 'rgba(34, 197, 94, 0.5)',
    negative: 'rgba(234, 179, 8, 0.5)',
  },
  midnight: {
    name: 'Midnight',
    positive: 'rgba(129, 140, 248, 0.5)',
    negative: 'rgba(236, 72, 153, 0.5)',
  },
  aurora: {
    name: 'Aurora',
    positive: 'rgba(52, 211, 153, 0.5)',
    negative: 'rgba(167, 139, 250, 0.5)',
  },
  candy: {
    name: 'Candy',
    positive: 'rgba(244, 114, 182, 0.5)',
    negative: 'rgba(168, 85, 247, 0.5)',
  },
}
