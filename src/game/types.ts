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

export type Phase = 'ready' | 'preview' | 'covering' | 'prompt' | 'shuffling' | 'choosing' | 'won' | 'lost'
export type LineShift = { axis: 'row' | 'column'; index: number; direction: 1 | -1 }
export type Round = {
  slots: number[]
  plan: LineShift[]
  lastShift: LineShift | null
  cursor: number
  phase: Phase
  paused: boolean
  selected: number | null
}
