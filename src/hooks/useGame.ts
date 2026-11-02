import { useCallback, useReducer } from 'react'
import type { Direction, Level, Position } from '../game/types'
import { movePosition, samePosition } from '../game/rules'

type State = { position: Position; steps: number; status: 'playing' | 'won' }
type Action = { type: 'move'; direction: Direction } | { type: 'reset' }

export function useGame(level: Level) {
  const initial: State = { position: level.start, steps: 0, status: 'playing' }
  const [state, dispatch] = useReducer((state: State, action: Action): State => {
    if (action.type === 'reset') return initial
    if (state.status !== 'playing') return state
    const position = movePosition(level, state.position, action.direction)
    if (!position) return state
    return { position, steps: state.steps + 1, status: samePosition(position, level.goal) ? 'won' : 'playing' }
  }, initial)
  const move = useCallback((direction: Direction) => dispatch({ type: 'move', direction }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])
  return { ...state, move, reset }
}
