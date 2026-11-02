import { useCallback, useEffect, useReducer } from 'react'
import { createRound, swapSlots, TARGET } from '../game/shuffle'
import type { Level, Round } from '../game/types'

type Action =
  | { type: 'advance' }
  | { type: 'pick'; slot: number }
  | { type: 'reset'; round: Round }
  | { type: 'pause' }
  | { type: 'resume' }

function reducer(state: Round, action: Action): Round {
  if (action.type === 'reset') return action.round
  if (action.type === 'resume') return { ...state, paused: false }
  if (action.type === 'pause') return state.phase === 'won' || state.phase === 'lost' ? state : { ...state, paused: true }
  if (state.paused) return state
  if (action.type === 'pick') {
    if (state.phase !== 'choosing' || !Number.isInteger(action.slot) || action.slot < 0 || action.slot >= state.slots.length) return state
    return { ...state, selected: action.slot, phase: state.slots[action.slot] === TARGET ? 'won' : 'lost' }
  }
  if (state.phase === 'preview') return { ...state, phase: 'covering' }
  if (state.phase === 'covering') return { ...state, phase: 'shuffling' }
  if (state.phase !== 'shuffling') return state
  if (state.cursor === state.plan.length) return { ...state, phase: 'choosing' }
  return { ...state, slots: swapSlots(state.slots, state.plan[state.cursor]), cursor: state.cursor + 1 }
}

export function useGame(level: Level) {
  const [state, dispatch] = useReducer(reducer, level, createRound)
  useEffect(() => {
    if (state.paused || !['preview', 'covering', 'shuffling'].includes(state.phase)) return
    const delay = state.phase === 'preview' ? level.previewMs
      : state.phase === 'covering' ? 450 : level.swapMs
    const timer = window.setTimeout(() => dispatch({ type: 'advance' }), delay)
    return () => window.clearTimeout(timer)
  }, [state, level])
  const pick = useCallback((slot: number) => dispatch({ type: 'pick', slot }), [])
  const reset = useCallback(() => dispatch({ type: 'reset', round: createRound(level) }), [level])
  const pause = useCallback(() => dispatch({ type: 'pause' }), [])
  const resume = useCallback(() => dispatch({ type: 'resume' }), [])
  return { ...state, pick, reset, pause, resume }
}
