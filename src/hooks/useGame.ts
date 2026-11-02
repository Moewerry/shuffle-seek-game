import { useCallback, useReducer } from 'react'
import type { Direction, Level, Position } from '../game/types'
import { movePosition, samePosition } from '../game/rules'

type State = { position: Position; previous: Position | null; steps: number; status: 'playing' | 'paused' | 'won' }
type Action =
  | { type: 'move'; direction: Direction }
  | { type: 'reset' }
  | { type: 'undo' }
  | { type: 'pause' }
  | { type: 'resume' }

export function useGame(level: Level) {
  const initial: State = { position: level.start, previous: null, steps: 0, status: 'playing' }
  const [state, dispatch] = useReducer((state: State, action: Action): State => {
    if (action.type === 'reset') return initial
    if (action.type === 'resume') return state.status === 'paused' ? { ...state, status: 'playing' } : state
    if (state.status !== 'playing') return state
    if (action.type === 'pause') return { ...state, status: 'paused' }
    if (action.type === 'undo') return state.previous ? { ...state, position: state.previous, previous: null, steps: state.steps - 1 } : state
    const position = movePosition(level, state.position, action.direction)
    if (!position) return state
    return { position, previous: state.position, steps: state.steps + 1, status: samePosition(position, level.goal) ? 'won' : 'playing' }
  }, initial)
  const move = useCallback((direction: Direction) => dispatch({ type: 'move', direction }), [])
  const reset = useCallback(() => dispatch({ type: 'reset' }), [])
  const undo = useCallback(() => dispatch({ type: 'undo' }), [])
  const pause = useCallback(() => dispatch({ type: 'pause' }), [])
  const resume = useCallback(() => dispatch({ type: 'resume' }), [])
  return { ...state, move, reset, undo, pause, resume }
}
