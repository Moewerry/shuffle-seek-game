import { ArrowRight, Trophy } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'
import { Card } from '../ui/card'

type Props = { open: boolean; lastLevel: boolean; onNext?: () => void; onHome: () => void }

export function SuccessOverlay({ open, lastLevel, onNext, onHome }: Props) {
  return <Dialog open={open}>
    <DialogContent fullScreen showClose={false} aria-describedby={undefined}
      onEscapeKeyDown={event => event.preventDefault()} onInteractOutside={event => event.preventDefault()}>
      <Card stock="paper" edge="deckle" tape="top" tilt={false} seed="success-note" className="items-center px-8 py-10 text-center">
        <DialogTitle className="flex items-center justify-center gap-3 text-3xl font-bold">
          <Trophy className="size-8 shrink-0 text-primary" aria-hidden="true" />
          {lastLevel ? '全部通关' : '找到了'}
        </DialogTitle>
        <Button className="mt-4 min-w-56" onClick={lastLevel ? onHome : onNext}>
          {lastLevel ? '完成，返回首页' : '下一关'}<ArrowRight />
        </Button>
      </Card>
    </DialogContent>
  </Dialog>
}
