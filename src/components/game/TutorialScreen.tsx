import { useMemo, useState } from 'react'
import { ArrowRight, RotateCcw } from 'lucide-react'
import { createTutorialRound, tutorialLevel, tutorialSteps } from '../../game/tutorial'
import { TARGET } from '../../game/shuffle'
import { useGame } from '../../hooks/useGame'
import { useAutoPause } from '../../hooks/useAutoPause'
import { useSound } from '../../hooks/useSound'
import { Button } from '../ui/button'
import { Board } from './Board'
import { PauseDialog } from './PauseDialog'
import { GameToolbar } from './GameToolbar'
import { TutorialInstructions } from './TutorialInstructions'

type Props = { sound: boolean; onHome: () => void; onFinish: () => void }

export function TutorialScreen(props: Props) {
  const [step, setStep] = useState(0)
  return <TutorialRound key={step} {...props} step={step} onNext={() => setStep(value => value + 1)} />
}

function TutorialRound({ step, sound, onHome, onFinish, onNext }: Props & { step: number; onNext: () => void }) {
  const level = useMemo(() => tutorialLevel(step), [step])
  const game = useGame(level, createTutorialRound, step === 0)
  const playSound = useSound(sound)
  useAutoPause(game.pause)
  const won = game.phase === 'won'
  const lost = game.phase === 'lost'
  const final = step === tutorialSteps.length - 1
  const message = game.phase === 'preview' ? '记住星星的位置。'
    : game.phase === 'covering' ? '盒子盖上了。'
    : game.phase === 'prompt' ? tutorialSteps[step].description
    : game.phase === 'shuffling' ? tutorialSteps[step].description
    : won ? final ? '学会了！' : '找对了！'
    : lost ? '星星在这里，再试一次。'
    : step === 1 ? '点开刚才藏星星的盒子。' : '停下了，找出星星。'

  return <div className="game-view">
    <GameToolbar onSettings={game.pause} disabled={won || lost || game.paused} />
    <main className="game-layout">
    <section className="board-area" aria-label="新手教学棋盘">
      <Board level={level} slots={game.slots} shift={game.lastShift} phase={game.phase} paused={game.paused} selected={game.selected} onPick={slot => {
        if (game.paused || !['prompt', 'choosing'].includes(game.phase)) return
        game.pick(slot)
        if (game.phase === 'choosing' || (game.phase === 'prompt' && game.slots[slot] === TARGET && game.plan.length === 0)) playSound(game.slots[slot] === TARGET)
      }} />
    </section>
    <aside className="game-sidebar">
      <TutorialInstructions step={step} message={game.paused ? '教学已暂停' : message} />
      <div className="game-actions flex flex-wrap gap-2">
        {won ? <Button disabled={game.paused} onClick={final ? onFinish : onNext}>{final ? '完成教学' : '下一步'}<ArrowRight /></Button>
          : lost && <Button variant="outline" onClick={game.reset}><RotateCcw />再试一次</Button>}
      </div>
      {(won || lost) && <Button variant="ghost" onClick={onHome}>返回首页</Button>}
    </aside>
    <PauseDialog open={game.paused} onResume={game.resume} onReset={game.reset} onHome={onHome} />
    </main>
  </div>
}
