import type { Direction, Level, Position } from './types'

const vectors: Record<Direction, Position> = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
}

export function samePosition(a: Position, b: Position) {
  return a.x === b.x && a.y === b.y
}

export function movePosition(level: Level, position: Position, direction: Direction): Position | null {
  const delta = vectors[direction]
  const next = { x: position.x + delta.x, y: position.y + delta.y }
  if (next.x < 0 || next.y < 0 || next.x >= level.width || next.y >= level.height) return null
  if (level.obstacles.some(obstacle => samePosition(obstacle, next))) return null
  return next
}
