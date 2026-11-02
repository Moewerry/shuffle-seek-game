import type { Level, Round, Swap } from './types'

export const TARGET = 0

export function swapSlots(slots: number[], [a, b]: Swap) {
  const next = [...slots]
  ;[next[a], next[b]] = [next[b], next[a]]
  return next
}

export function createRound(level: Level): Round {
  const slots = Array.from({ length: level.width * level.height }, (_, id) => id)
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[slots[i], slots[j]] = [slots[j], slots[i]]
  }
  let simulated = [...slots]
  const plan: Swap[] = []
  for (let i = 0; i < level.swaps; i++) {
    // Move the target at least once. Adjacent swaps make its covered box trackable.
    const a = i === 0 || Math.random() < 0.6
      ? simulated.indexOf(TARGET) : Math.floor(Math.random() * slots.length)
    const x = a % level.width
    const y = Math.floor(a / level.width)
    const neighbors = [
      ...(x > 0 ? [a - 1] : []), ...(x < level.width - 1 ? [a + 1] : []),
      ...(y > 0 ? [a - level.width] : []), ...(y < level.height - 1 ? [a + level.width] : []),
    ]
    const swap: Swap = [a, neighbors[Math.floor(Math.random() * neighbors.length)]]
    plan.push(swap)
    simulated = swapSlots(simulated, swap)
  }
  return { slots, plan, cursor: 0, phase: 'preview', paused: false, selected: null }
}
