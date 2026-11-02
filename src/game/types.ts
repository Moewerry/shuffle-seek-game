export type Level = {
  id: number
  title: string
  hint: string
  width: number
  height: number
  swaps: number
  swapMs: number
  previewMs: number
}

export type Phase = 'preview' | 'covering' | 'shuffling' | 'choosing' | 'won' | 'lost'
export type Swap = readonly [number, number]
export type Round = {
  slots: number[]
  plan: Swap[]
  cursor: number
  phase: Phase
  paused: boolean
  selected: number | null
}
