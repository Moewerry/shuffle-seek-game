import type { Level, LineShift, Round } from './types'

export const TARGET = 0

export function shiftSlots(slots: number[], shift: LineShift, level: Pick<Level, 'width' | 'height'>) {
  const next = [...slots]
  const length = shift.axis === 'row' ? level.width : level.height
  for (let offset = 0; offset < length; offset++) {
    const destination = (offset + shift.direction + length) % length
    const from = shift.axis === 'row' ? shift.index * level.width + offset : offset * level.width + shift.index
    const to = shift.axis === 'row' ? shift.index * level.width + destination : destination * level.width + shift.index
    next[to] = slots[from]
  }
  return next
}

export function createRound(level: Level): Round {
  const slots = Array.from({ length: level.width * level.height }, (_, id) => id)
  for (let i = slots.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[slots[i], slots[j]] = [slots[j], slots[i]]
  }
  let simulated = [...slots]
  const plan: LineShift[] = []
  const firstRow = Math.random() < 0.5
  for (let i = 0; i < level.swaps; i++) {
    const axis = (i % 2 === 0) === firstRow ? 'row' : 'column'
    const target = simulated.indexOf(TARGET)
    const trackTarget = i === 0 || Math.random() < 0.6
    const length = axis === 'row' ? level.height : level.width
    const index = trackTarget
      ? axis === 'row' ? Math.floor(target / level.width) : target % level.width
      : Math.floor(Math.random() * length)
    const shift: LineShift = { axis, index, direction: Math.random() < 0.5 ? 1 : -1 }
    plan.push(shift)
    simulated = shiftSlots(simulated, shift, level)
  }
  return { slots, plan, lastShift: null, cursor: 0, phase: 'ready', paused: false, selected: null }
}
