import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Pause, RotateCcw } from 'lucide-react'
import { createTutorialRound, tutorialLevel, tutorialSteps } from '../../game/tutorial'
import { TARGET } from '../../game/shuffle'
import { useGame } from '../../hooks/useGame'
import { useAutoPause } from '../../hooks/useAutoPause'
import { useSound } from '../../hooks/useSound'
import { Button } from '../ui/button'
import { Board } from './Board'
import { PauseDialog } from './PauseDialog'

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
  const message = game.phase === 'preview' ? '看，星星藏在这里。先记住它的位置。'
    : game.phase === 'covering' ? '现在把盒子盖好……'
    : game.phase === 'prompt' ? '就是这个盒子，点击光圈试试看。'
    : game.phase === 'shuffling' ? '盯住藏星星的盒子，等它停下来。'
    : won ? final ? '全部完成！你已经学会追踪星星了。' : '找对了！星星一直在这个盒子里。'
    : lost ? '差一点！看看星星的位置，再观察一次吧。'
    : '现在，点开你认为藏着星星的盒子。'

  return <main className="game-layout">
    <section className="board-area" aria-label="新手教学棋盘">
      <Board level={level} slots={game.slots} shift={game.lastShift} phase={game.phase} paused={game.paused} selected={game.selected} onPick={slot => {
        if (game.paused || !['prompt', 'choosing'].includes(game.phase)) return
        game.pick(slot)
        if (game.phase === 'choosing') playSound(game.slots[slot] === TARGET)
      }} />
    </section>
    <aside className="game-sidebar">
      <p className="text-xs font-bold tracking-widest text-violet-600">新手教学 · {step === 0 ? '入门演示' : `练习 ${step} / 4`}</p>
      <div className="w-full rounded-3xl border border-white bg-gradient-to-br from-purple-50 to-violet-100 p-4 text-[#30284f] shadow-sm sm:p-5">
        <h1 className="font-serif text-lg font-semibold">{level.title}</h1>
        <p className="mt-2 text-sm leading-relaxed">{tutorialSteps[step].description}</p>
        <p className="mt-3 min-h-10 text-sm font-semibold text-violet-700" role="status" aria-live="polite">{game.paused ? '教学已暂停' : message}</p>
      </div>
      <div className="flex gap-2" aria-label={`教学进度 ${step + 1} / 5`}>
        {tutorialSteps.map((item, index) => <span key={item.title} className={`h-1.5 w-7 rounded-full ${index <= step ? 'bg-violet-500' : 'bg-violet-200'}`} />)}
      </div>
      <div className="game-actions flex flex-wrap gap-2">
        {won ? <Button disabled={game.paused} onClick={final ? onFinish : onNext}>{final ? '完成教学，返回首页' : step === 0 ? '开始练习' : '下一次练习'}<ArrowRight /></Button>
          : <Button variant="outline" disabled={game.paused} onClick={game.reset}><RotateCcw />{lost ? '再试一次' : '重新观察'}</Button>}
        {!won && !lost && <Button variant="ghost" disabled={game.paused} onClick={game.pause}><Pause />暂停</Button>}
      </div>
      <Button variant="ghost" className="game-home" onClick={onHome}><ArrowLeft />返回首页</Button>
    </aside>
    <PauseDialog open={game.paused} onResume={game.resume} onReset={game.reset} onHome={onHome} />
  </main>
}
