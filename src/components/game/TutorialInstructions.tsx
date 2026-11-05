import { tutorialSteps } from '../../game/tutorial'
import { Card } from '../ui/card'

type Props = { step: number; message: string }

export function TutorialInstructions({ step, message }: Props) {
  return <>
    <p className="text-xs font-bold tracking-widest text-ink-you">新手教学 · {step + 1} / {tutorialSteps.length}</p>
    <Card stock="pad" rules="ruled" edge="torn" tilt={false} seed="tutorial-note" className="tutorial-message w-full gap-0 p-4 text-foreground sm:p-5">
      <h1 className="text-lg font-semibold">{tutorialSteps[step].title}</h1>
      <p className="mt-3 min-h-10 text-sm font-semibold text-ink-you" role="status" aria-live="polite">{message}</p>
    </Card>
    <div className="flex w-full gap-2" role="progressbar" aria-label="教学进度" aria-valuemin={1} aria-valuemax={tutorialSteps.length} aria-valuenow={step + 1}>
      {tutorialSteps.map((item, index) => <span key={item.title} className={`h-1.5 flex-1 rounded-sm ${index <= step ? 'bg-ink-you' : 'bg-pencil-mark/30'}`} />)}
    </div>
  </>
}
