import { ArrowLeft } from 'lucide-react'
import { useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import type { Level } from '../../game/types'
import { Button } from '../ui/button'
import { Board } from './Board'
import { DirectionPad } from './DirectionPad'
import { WinDialog } from './WinDialog'

type Props = { level: Level; total: number; onHome: () => void; onComplete?: (id: number) => void; onNext?: () => void }

export function GameScreen({ level, total, onHome, onComplete, onNext }: Props) {
  const game = useGame(level)
  useEffect(() => {
    if (game.status === 'won') onComplete?.(level.id)
  }, [game.status, level.id, onComplete])

  return <main className="game-layout">
    <section className="board-area"><Board level={level} position={game.position} /></section>
    <aside className="game-sidebar">
      <div><p className="text-xs font-bold tracking-widest text-primary">LEVEL {String(level.id).padStart(2, '0')} / {String(total).padStart(2, '0')}</p><h1 className="mt-2 text-2xl font-bold">{level.title}</h1><p className="mt-2 text-sm text-muted-foreground">{level.hint}</p></div>
      <p className="text-sm" aria-live="polite">移动步数 <strong className="ml-2 text-2xl tabular-nums">{game.steps}</strong></p>
      <DirectionPad onMove={game.move} disabled={game.status !== 'playing'} />
      <Button variant="ghost" onClick={onHome}><ArrowLeft /> 返回首页</Button>
    </aside>
    <WinDialog open={game.status === 'won'} steps={game.steps} onReplay={game.reset} onHome={onHome} onNext={onNext} lastLevel={level.id === total} />
  </main>
}
