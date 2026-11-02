import { shiftSlots, TARGET } from './shuffle'
import type { Level, LineShift, Round } from './types'

export const tutorialSteps = [
  { title: '先认识藏星星的盒子', description: '盖好后，点击光圈里的盒子。然后看着它向下移动。', moves: [{ axis: 'column', direction: 1 }] },
  { title: '第一次 · 记住就能找到', description: '这次盒子不移动。记住星星，盖好后把它找出来。', moves: [] },
  { title: '第二次 · 跟着向右走', description: '藏星星的盒子会向右移动一格。盯住它的新位置。', moves: [{ axis: 'row', direction: 1 }] },
  { title: '第三次 · 再试试向上', description: '这次向上移动一格。星星一直藏在同一个盒子里。', moves: [{ axis: 'column', direction: -1 }] },
  { title: '第四次 · 连续跟两步', description: '先向左，再向下。等两次移动结束，再找出星星。', moves: [{ axis: 'row', direction: -1 }, { axis: 'column', direction: 1 }] },
] satisfies { title: string; description: string; moves: Pick<LineShift, 'axis' | 'direction'>[] }[]

export function tutorialLevel(step: number): Level {
  return { id: step, title: tutorialSteps[step].title, hint: '', width: 3, height: 3, swaps: tutorialSteps[step].moves.length, swapMs: 1200, previewMs: 2400 }
}

export function createTutorialRound(level: Level): Round {
  const slots = [1, 2, 3, 4, TARGET, 5, 6, 7, 8]
  let simulated = slots
  const plan = tutorialSteps[level.id].moves.map(move => {
    const target = simulated.indexOf(TARGET)
    const shift: LineShift = { ...move, index: move.axis === 'row' ? Math.floor(target / 3) : target % 3 }
    simulated = shiftSlots(simulated, shift, level)
    return shift
  })
  return { slots, plan, lastShift: null, cursor: 0, phase: 'preview', paused: false, selected: null }
}
