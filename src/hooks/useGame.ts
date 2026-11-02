import { useCallback, useEffect, useReducer } from 'react'
import { createRound, shiftSlots, TARGET } from '../game/shuffle'
import type { Level, Round } from '../game/types'

type Action =
  | { type: 'advance'; level: Level; waitForTap?: boolean }
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
    if (state.phase === 'prompt') return state.slots[action.slot] === TARGET ? { ...state, phase: 'shuffling' } : state
    if (state.phase !== 'choosing' || !Number.isInteger(action.slot) || action.slot < 0 || action.slot >= state.slots.length) return state
    return { ...state, selected: action.slot, phase: state.slots[action.slot] === TARGET ? 'won' : 'lost' }
  }
  if (state.phase === 'ready') return { ...state, phase: 'preview', countdown: 3 }
  if (state.phase === 'preview') {
    if (state.countdown !== undefined && state.countdown > 1) return { ...state, countdown: state.countdown - 1 }
    return { ...state, phase: 'covering', countdown: undefined }
  }
  if (state.phase === 'covering') return { ...state, phase: action.waitForTap ? 'prompt' : 'shuffling' }
  if (state.phase !== 'shuffling') return state
  if (state.cursor === state.plan.length) return { ...state, phase: 'choosing' }
  const shift = state.plan[state.cursor]
  return { ...state, slots: shiftSlots(state.slots, shift, action.level), lastShift: shift, cursor: state.cursor + 1 }
}

export function useGame(level: Level, factory = createRound, waitForTap = false) {
  const [state, dispatch] = useReducer(reducer, level, factory)
  useEffect(() => {
    if (state.paused || !['ready', 'preview', 'covering', 'shuffling'].includes(state.phase)) return
    const delay = state.phase === 'ready' ? 1200 : state.phase === 'preview' ? state.countdown !== undefined ? 1000 : level.previewMs
      : state.phase === 'covering' ? 450 : level.swapMs
    const timer = window.setTimeout(() => dispatch({ type: 'advance', level, waitForTap }), delay)
    return () => window.clearTimeout(timer)
  }, [state, level, waitForTap])
  const pick = useCallback((slot: number) => dispatch({ type: 'pick', slot }), [])
  const reset = useCallback(() => dispatch({ type: 'reset', round: factory(level) }), [level, factory])
  const pause = useCallback(() => dispatch({ type: 'pause' }), [])
  const resume = useCallback(() => dispatch({ type: 'resume' }), [])
  return { ...state, pick, reset, pause, resume }
}
