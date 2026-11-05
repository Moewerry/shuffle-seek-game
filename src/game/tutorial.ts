import { shiftSlots, TARGET } from './shuffle'
import type { Level, LineShift, Round } from './types'

export const tutorialSteps = [
  { title: '点开盒子', description: '点击光圈里的盒子。', moves: [] },
  { title: '记住位置', description: '盒子没有移动。', moves: [] },
  { title: '向右一格', description: '跟着盒子向右看。', moves: [{ axis: 'row', direction: 1 }] },
  { title: '向左一格', description: '跟着盒子向左看。', moves: [{ axis: 'row', direction: -1 }] },
  { title: '向下一格', description: '跟着盒子向下看。', moves: [{ axis: 'column', direction: 1 }] },
  { title: '向上一格', description: '跟着盒子向上看。', moves: [{ axis: 'column', direction: -1 }] },
  { title: '到边缘会绕回来', description: '移出右边后，会从左边回来。', moves: [{ axis: 'row', direction: 1 }, { axis: 'row', direction: 1 }] },
  { title: '连续跟两步', description: '先向左，再向下。', moves: [{ axis: 'row', direction: -1 }, { axis: 'column', direction: 1 }] },
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
