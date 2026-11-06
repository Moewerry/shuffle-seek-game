import { ArrowRight, Trophy } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; lastLevel: boolean; onNext?: () => void; onHome: () => void }

export function SuccessOverlay({ open, lastLevel, onNext, onHome }: Props) {
  return <Dialog open={open}>
    <DialogContent showClose={false} className="max-h-[calc(var(--game-height)-24px)] gap-4 overflow-visible p-[clamp(16px,calc(var(--game-height)*0.06),32px)] text-center" aria-describedby={undefined}
      onEscapeKeyDown={event => event.preventDefault()} onInteractOutside={event => event.preventDefault()}>
      <DialogTitle className="flex items-center justify-center gap-3 text-2xl font-bold">
        <Trophy className="size-7 shrink-0 text-primary" aria-hidden="true" />
        {lastLevel ? '全部通关' : '找到了'}
      </DialogTitle>
      <Button onClick={lastLevel ? onHome : onNext}>
        {lastLevel ? '完成，返回首页' : '下一关'}<ArrowRight />
      </Button>
    </DialogContent>
  </Dialog>
}
