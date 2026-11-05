import { useLayoutEffect, useRef } from 'react'
import { Circle, HelpCircle, Star, X } from 'lucide-react'
import { TARGET } from '../../game/shuffle'
import type { Level, LineShift, Phase } from '../../game/types'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import { TutorialGesture } from './TutorialGesture'
import { BoardMask } from './BoardMask'
import { BoxFace } from './BoxFace'
import { Paper } from '../ui/paper'

type Props = {
  level: Level
  slots: number[]
  shift: LineShift | null
  phase: Phase
  paused: boolean
  selected: number | null
  onPick: (slot: number) => void
  showPreviewMask?: boolean
  countdown?: number
}

export function Board({ level, slots, shift, phase, paused, selected, onPick, showPreviewMask = false, countdown }: Props) {
  const boardRef = useRef<HTMLDivElement>(null)
  const pausedAnimations = useRef<Animation[]>([])
  const moving = phase === 'shuffling' && shift !== null
  useLayoutEffect(() => {
    const board = boardRef.current
    if (!board || !moving || !shift) return
    const horizontal = shift.axis === 'row'
    const pitch = horizontal ? board.clientWidth / level.width : board.clientHeight / level.height
    const distance = -shift.direction * pitch
    const transform = (value: number) => horizontal ? `translateX(${value}px)` : `translateY(${value}px)`
    const options: KeyframeAnimationOptions = { duration: level.swapMs * 0.78, easing: 'cubic-bezier(0.4, 0, 0.2, 1)', fill: 'both' }
    const animations: Animation[] = []
    board.querySelectorAll<HTMLElement>('.blind-card[data-slot]').forEach(element => {
      const slot = Number(element.dataset.slot)
      const line = horizontal ? Math.floor(slot / level.width) : slot % level.width
      if (line === shift.index) animations.push(element.animate([{ transform: transform(distance) }, { transform: transform(0) }], options))
    })
    const ghost = board.querySelector<HTMLElement>('[data-ghost]')
    if (ghost) animations.push(ghost.animate([{ transform: transform(0) }, { transform: transform(-distance) }], options))
    return () => animations.forEach(animation => animation.cancel())
  }, [slots, shift, moving, level])
  useLayoutEffect(() => {
    if (paused) {
      pausedAnimations.current = boardRef.current?.getAnimations({ subtree: true }) ?? []
      pausedAnimations.current.forEach(animation => animation.pause())
    } else {
      pausedAnimations.current.forEach(animation => { if (animation.playState === 'paused') animation.play() })
      pausedAnimations.current = []
    }
  }, [paused])
  const revealed = phase === 'won' || phase === 'lost'
  const canPick = (phase === 'choosing' || phase === 'prompt') && !paused
  const slotStyle = (slot: number) => ({
    left: `${slot % level.width * 100 / level.width}%`,
    top: `${Math.floor(slot / level.width) * 100 / level.height}%`,
    width: `${100 / level.width}%`, height: `${100 / level.height}%`,
  })
  const outgoing = shift?.axis === 'row'
    ? shift.index * level.width + (shift.direction === 1 ? level.width - 1 : 0)
    : (shift?.direction === 1 ? level.height - 1 : 0) * level.width + (shift?.index ?? 0)

  return <Paper stock="paper" rules="graph" edge="cut" shadow="none" tilt={false} seed="game-board" className="board-frame">
    <div ref={boardRef} className="blind-board" role="group" aria-label={`第 ${level.id} 关，${level.width} 乘 ${level.height} 盲盒棋盘，整行或整列循环平移`}>
      {moving && shift && <div className="shift-lane" aria-hidden="true" style={shift.axis === 'row'
        ? { top: `${shift.index * 100 / level.height}%`, left: 0, width: '100%', height: `${100 / level.height}%` }
        : { left: `${shift.index * 100 / level.width}%`, top: 0, height: '100%', width: `${100 / level.width}%` }} />}
      {slots.map((id, slot) => {
        const targetVisible = !paused && id === TARGET && (phase === 'preview' || revealed)
        const wrong = revealed && slot === selected && id !== TARGET
        const empty = revealed && id !== TARGET && !wrong
        const Icon = targetVisible ? Star : wrong ? X : empty ? Circle : HelpCircle
        const guided = phase === 'prompt' && id === TARGET && !paused
        return <Button key={id} variant="ghost" disabled={!canPick || (phase === 'prompt' && id !== TARGET)} data-slot={slot}
          onClick={() => onPick(slot)}
          aria-label={`第 ${Math.floor(slot / level.width) + 1} 行，第 ${slot % level.width + 1} 列，${targetVisible ? '目标星星' : wrong ? '选中的空盒' : empty ? '空盒' : '未揭晓的盲盒'}`}
          className={cn('blind-card disabled:opacity-100', showPreviewMask && phase === 'preview' && targetVisible && 'z-20')} style={slotStyle(slot)}>
          <BoxFace icon={Icon} target={targetVisible} wrong={wrong} empty={empty} guided={guided} />
          {guided && <TutorialGesture />}
        </Button>
      })}
      {moving && <div data-ghost className="blind-card box-ghost" aria-hidden="true" style={slotStyle(outgoing)}><BoxFace icon={HelpCircle} /></div>}
    </div>
    {showPreviewMask && <BoardMask light={level.id === 4} phase={phase} paused={paused} countdown={countdown} />}
  </Paper>
}
