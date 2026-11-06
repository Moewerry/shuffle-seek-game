import type { Level, LineShift, Round } from './types'

export const TARGET = 0

function randomize<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]
}

function createAxes(level: Level): LineShift['axis'][] {
  const axes: LineShift['axis'][] = []
  const first = pick(['row', 'column'] as const)
  const repeatAt = 1 + Math.floor(Math.random() * Math.max(1, level.swaps - 1))
  for (let i = 0; i < level.swaps; i++) {
    const previous = axes[i - 1]
    const opposite = previous === 'row' ? 'column' : 'row'
    if (level.pattern === 'rows') axes.push('row')
    else if (level.pattern === 'columns') axes.push('column')
    else if (i === 0) axes.push(first)
    else if (level.pattern !== 'mixed') axes.push(opposite)
    else if (i > 1 && previous === axes[i - 2]) axes.push(opposite)
    else axes.push(i === repeatAt ? previous : pick(['row', 'column'] as const))
  }
  return axes
}

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
  const slots = randomize(Array.from({ length: level.width * level.height }, (_, id) => id))
  const axes = createAxes(level)
  if (level.wrapFirst && axes.length > 0) {
    const target = slots.indexOf(TARGET)
    const horizontal = axes[0] === 'row'
    const edge = Math.random() < 0.5 ? 0 : (horizontal ? level.width : level.height) - 1
    const edgeSlot = horizontal ? Math.floor(target / level.width) * level.width + edge : edge * level.width + target % level.width
    ;[slots[target], slots[edgeSlot]] = [slots[edgeSlot], slots[target]]
  }

  // Keep the first and last moves focused on the target; scatter exact decoy counts in between.
  const middleSteps = randomize(Array.from({ length: Math.max(0, level.swaps - 2) }, (_, i) => i + 1))
  const decoySteps = new Set(middleSteps.slice(0, level.decoyMoves ?? 0))
  const initialTarget = slots.indexOf(TARGET)
  let simulated = [...slots]
  const plan: LineShift[] = []
  for (let i = 0; i < level.swaps; i++) {
    const axis = axes[i]
    const target = simulated.indexOf(TARGET)
    const targetLine = axis === 'row' ? Math.floor(target / level.width) : target % level.width
    const lineCount = axis === 'row' ? level.height : level.width
    const indices = decoySteps.has(i)
      ? Array.from({ length: lineCount }, (_, index) => index).filter(index => index !== targetLine)
      : [targetLine]
    let directions: LineShift['direction'][] = level.forwardOnly ? [1] : [1, -1]
    const singleAxis = level.pattern === 'rows' || level.pattern === 'columns'
    if (i === 1 && singleAxis && !level.forwardOnly) {
      directions = [plan[0].direction === 1 ? -1 : 1]
    }
    if (i === 0 && level.wrapFirst) {
      const offset = axis === 'row' ? target % level.width : Math.floor(target / level.width)
      directions = [offset === 0 ? -1 : 1]
    }
    let candidates: LineShift[] = indices.flatMap(index => directions.map(direction => ({ axis, index, direction })))
    if (i === level.swaps - 1) {
      const differentFinish = candidates.filter(shift => shiftSlots(simulated, shift, level).indexOf(TARGET) !== initialTarget)
      if (differentFinish.length > 0) candidates = differentFinish
    }
    const previous = plan[i - 1]
    const lineLength = axis === 'row' ? level.width : level.height
    const withoutUndo = candidates.filter(shift => !previous || previous.axis !== shift.axis || previous.index !== shift.index
      || (lineLength > 2 && previous.direction === shift.direction))
    const shift = pick(!singleAxis && withoutUndo.length > 0 ? withoutUndo : candidates)
    plan.push(shift)
    simulated = shiftSlots(simulated, shift, level)
  }
  return { slots, plan, lastShift: null, cursor: 0, phase: 'ready', paused: false, selected: null }
}
