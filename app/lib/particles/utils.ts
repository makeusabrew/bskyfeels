// Deterministic random number generator for consistent particle behavior
export function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export function constrainVelocity(velocity: number, maxVel: number = 0.3): number {
  return Math.max(Math.min(velocity, maxVel), -maxVel)
}

export function randomVelocityChange(currentVel: number, maxVel: number = 0.3): number {
  const newVel = currentVel + (Math.random() - 0.5) * 0.1
  return constrainVelocity(newVel, maxVel)
}

export function handleVerticalBounce(
  y: number,
  baseY: number,
  vy: number,
  range: number = 50
): { y: number; vy: number } {
  if (Math.abs(y - baseY) > range) {
    return {
      y: baseY + range * Math.sign(y - baseY),
      vy: vy * -0.5,
    }
  }
  return { y, vy }
}
