import { useLayoutEffect, useRef } from 'react'
import { Circle, HelpCircle, Star, X } from 'lucide-react'
import { TARGET } from '../../game/shuffle'
import type { Level, Phase } from '../../game/types'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

type Props = {
  level: Level
  slots: number[]
  phase: Phase
  paused: boolean
  selected: number | null
  onPick: (slot: number) => void
}

export function Board({ level, slots, phase, paused, selected, onPick }: Props) {
  const boardRef = useRef<HTMLDivElement>(null)
  const pausedAnimations = useRef<Animation[]>([])
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
  const canPick = phase === 'choosing' && !paused

  return <div className="board-frame">
    <div ref={boardRef} className="blind-board" role="group" aria-label={`第 ${level.id} 关，${level.width} 乘 ${level.height} 盲盒棋盘`}>
      {slots.map((id, slot) => {
        const targetVisible = !paused && id === TARGET && (phase === 'preview' || revealed)
        const wrong = revealed && slot === selected && id !== TARGET
        const empty = revealed && id !== TARGET && !wrong
        const Icon = targetVisible ? Star : wrong ? X : empty ? Circle : HelpCircle
        return <Button key={id} variant="outline" disabled={!canPick}
          onClick={() => onPick(slot)}
          aria-label={`第 ${Math.floor(slot / level.width) + 1} 行，第 ${slot % level.width + 1} 列，${targetVisible ? '目标星星' : wrong ? '选中的空盒' : empty ? '空盒' : '未揭晓的盲盒'}`}
          className={cn('blind-card disabled:opacity-100', targetVisible && 'blind-card-target', wrong && 'blind-card-wrong', empty && 'blind-card-empty')}
          style={{
            left: `calc(${slot % level.width * 100 / level.width}% + 4px)`,
            top: `calc(${Math.floor(slot / level.width) * 100 / level.height}% + 4px)`,
            width: `calc(${100 / level.width}% - 8px)`,
            height: `calc(${100 / level.height}% - 8px)`,
            transitionDuration: phase === 'shuffling' ? `${level.swapMs * 0.78}ms` : '0ms',
          }}>
          <Icon className={cn('box-symbol', targetVisible && 'fill-current')} aria-hidden="true" />
        </Button>
      })}
    </div>
  </div>
}
