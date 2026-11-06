import { useCallback, useEffect } from 'react'
import { useGame } from '../../hooks/useGame'
import { useSound } from '../../hooks/useSound'
import { useAutoPause } from '../../hooks/useAutoPause'
import { TARGET } from '../../game/shuffle'
import type { Level } from '../../game/types'
import { GameToolbar } from './GameToolbar'
import { Board } from './Board'
import { PauseDialog } from './PauseDialog'
import { ResultDialog } from './ResultDialog'
import { LevelBrief } from './LevelBrief'

type Props = { level: Level; total: number; sound: boolean; onHome: () => void; onComplete: (id: number) => void; onNext?: () => void }

export function GameScreen({ level, total, sound, onHome, onComplete, onNext }: Props) {
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
  const masked = !game.paused && (game.phase === 'ready' || game.phase === 'preview')
  const darkened = masked && level.id !== 4

  return <div className="game-view">
    <GameToolbar onSettings={game.pause} disabled={finished || game.paused} masked={darkened}>
      <LevelBrief level={level} masked={darkened} />
    </GameToolbar>
    <main className="min-h-0">
    <section className="board-area relative z-20" aria-label="记住星星，观察整行或整列平移，最后点开盲盒">
      <Board level={level} slots={game.slots} shift={game.lastShift} phase={game.phase} paused={game.paused} selected={game.selected} onPick={pick} showPreviewMask countdown={game.countdown} />
    </section>
    <ResultDialog open={finished} won={game.phase === 'won'} level={level} targetSlot={game.slots.indexOf(TARGET)} onReplay={game.reset} onHome={onHome} onNext={onNext} lastLevel={level.id === total} />
    <PauseDialog open={game.paused} onResume={game.resume} onReset={game.reset} onHome={onHome} />
    </main>
  </div>
}
