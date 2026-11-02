import { ArrowLeft, Pause, RotateCcw } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import { useSound } from '../../hooks/useSound'
import { useAutoPause } from '../../hooks/useAutoPause'
import { usePortrait } from '../../hooks/usePortrait'
import { TARGET } from '../../game/shuffle'
import type { Level } from '../../game/types'
import { Button } from '../ui/button'
import { Board } from './Board'
import { PauseDialog } from './PauseDialog'
import { PhaseIndicator } from './PhaseIndicator'
import { ResultDialog } from './ResultDialog'

type Props = { level: Level; total: number; sound: boolean; onHome: () => void; onComplete: (id: number) => void; onNext?: () => void }

export function GameScreen({ level, total, sound, onHome, onComplete, onNext }: Props) {
  const portrait = usePortrait()
  const game = useGame(level)
  const playSound = useSound(sound)
  useAutoPause(game.pause)
  const pick = useCallback((slot: number) => {
    if (game.phase !== 'choosing' || game.paused) return
    game.pick(slot)
    playSound(game.slots[slot] === TARGET)
  }, [game.phase, game.paused, game.pick, game.slots, playSound])
  useEffect(() => {
    if (game.phase === 'won') onComplete(level.id)
  }, [game.phase, level.id, onComplete])
  const finished = game.phase === 'won' || game.phase === 'lost'

  return <main className="game-layout">
    <section className="board-area" aria-label="记住星星，观察交换，最后点开盲盒">
      <Board level={level} slots={game.slots} phase={game.phase} paused={game.paused} selected={game.selected} onPick={pick} />
    </section>
    <aside className="game-sidebar">
      <div className="game-info">
        <p className="text-xs font-bold tracking-widest text-primary">LEVEL {String(level.id).padStart(2, '0')} / {String(total).padStart(2, '0')}</p>
        <h1 className="mt-2 text-2xl font-bold">{level.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{level.hint}</p>
      </div>
      <PhaseIndicator phase={game.phase} paused={game.paused} cursor={game.cursor} total={level.swaps} />
      <p className="game-rule text-xs leading-relaxed text-muted-foreground">记住 ★ → 盖上盒子 → 观察交换 → 点击揭晓<br />每轮只有一次选择，猜错可以重新挑战。</p>
      <div className="game-actions flex flex-wrap gap-2">
        <Button variant="outline" size="sm" disabled={finished || game.paused} onClick={game.pause}><Pause /> 暂停</Button>
        <Button variant="outline" size="sm" disabled={finished || game.paused} onClick={game.reset}><RotateCcw /> 重新观察</Button>
      </div>
      <Button variant="ghost" className="game-home" onClick={onHome}><ArrowLeft /> 返回首页</Button>
    </aside>
    <ResultDialog open={finished && !portrait} won={game.phase === 'won'} level={level} targetSlot={game.slots.indexOf(TARGET)} onReplay={game.reset} onHome={onHome} onNext={onNext} lastLevel={level.id === total} />
    <PauseDialog open={game.paused && !portrait} onResume={game.resume} onReset={game.reset} onHome={onHome} />
  </main>
}
