import { tutorialSteps } from '../../game/tutorial'

type Props = { step: number; message: string }

export function TutorialInstructions({ step, message }: Props) {
  return <>
    <p className="text-xs font-bold tracking-widest text-violet-600">新手教学 · {step + 1} / {tutorialSteps.length}</p>
    <div className="tutorial-message w-full rounded-3xl border border-white bg-gradient-to-br from-purple-50 to-violet-100 p-4 text-[#30284f] shadow-sm sm:p-5">
      <h1 className="font-serif text-lg font-semibold">{tutorialSteps[step].title}</h1>
      <p className="mt-3 min-h-10 text-sm font-semibold text-violet-700" role="status" aria-live="polite">{message}</p>
    </div>
    <div className="flex w-full gap-2" role="progressbar" aria-label="教学进度" aria-valuemin={1} aria-valuemax={tutorialSteps.length} aria-valuenow={step + 1}>
      {tutorialSteps.map((item, index) => <span key={item.title} className={`h-1.5 flex-1 rounded-full ${index <= step ? 'bg-violet-500' : 'bg-violet-200'}`} />)}
    </div>
  </>
}
