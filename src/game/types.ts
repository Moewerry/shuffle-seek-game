export type Position = { x: number; y: number }
export type Direction = 'up' | 'down' | 'left' | 'right'
export type Level = {
  id: number
  title: string
  hint: string
  width: number
  height: number
  start: Position
  goal: Position
  obstacles: Position[]
}
