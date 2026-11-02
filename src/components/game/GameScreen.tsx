import { ArrowLeft } from 'lucide-react'
import { useCallback, useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import { useSound } from '../../hooks/useSound'
import { movePosition, samePosition } from '../../game/rules'
import type { Direction, Level } from '../../game/types'
import { Button } from '../ui/button'
import { Board } from './Board'
import { DirectionPad } from './DirectionPad'
import { WinDialog } from './WinDialog'
import { PauseDialog } from './PauseDialog'
import { GameToolbar } from './GameToolbar'

type Props = { level: Level; total: number; sound: boolean; onHome: () => void; onComplete?: (id: number) => void; onNext?: () => void }

export function GameScreen({ level, total, sound, onHome, onComplete, onNext }: Props) {
  const game = useGame(level)
  const playSound = useSound(sound)
  const move = useCallback((direction: Direction) => {
    if (game.status !== 'playing') return
    const next = movePosition(level, game.position, direction)
    if (!next) return
    game.move(direction)
    playSound(samePosition(next, level.goal))
  }, [game.status, game.position, game.move, level, playSound])
  useEffect(() => {
    if (game.status === 'won') onComplete?.(level.id)
  }, [game.status, level.id, onComplete])

  return <main className="game-layout">
    <section className="board-area"><Board level={level} position={game.position} /></section>
    <aside className="game-sidebar">
      <div><p className="text-xs font-bold tracking-widest text-primary">LEVEL {String(level.id).padStart(2, '0')} / {String(total).padStart(2, '0')}</p><h1 className="mt-2 text-2xl font-bold">{level.title}</h1><p className="mt-2 text-sm text-muted-foreground">{level.hint}</p></div>
      <p className="text-sm" aria-live="polite">移动步数 <strong className="ml-2 text-2xl tabular-nums">{game.steps}</strong></p>
      <DirectionPad onMove={move} disabled={game.status !== 'playing'} />
      <GameToolbar canUndo={game.previous !== null} disabled={game.status !== 'playing'} onUndo={game.undo} onReset={game.reset} onPause={game.pause} />
      <Button variant="ghost" onClick={onHome}><ArrowLeft /> 返回首页</Button>
    </aside>
    <WinDialog open={game.status === 'won'} steps={game.steps} onReplay={game.reset} onHome={onHome} onNext={onNext} lastLevel={level.id === total} />
    <PauseDialog open={game.status === 'paused'} onResume={game.resume} onReset={game.reset} onHome={onHome} />
  </main>
}
