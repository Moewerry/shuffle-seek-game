import { ArrowRight, RotateCcw, Trophy } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; steps: number; onReplay: () => void; onHome: () => void; onNext?: () => void; lastLevel?: boolean }

export function WinDialog({ open, steps, onReplay, onHome, onNext, lastLevel = false }: Props) {
  return <Dialog open={open} onOpenChange={value => { if (!value) onHome() }}>
    <DialogContent>
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Trophy className="size-7" /></span>
      <DialogTitle className="pr-6 text-2xl font-bold">{lastLevel ? '全部通关，做得漂亮！' : '通关成功！'}</DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">你用 {steps} 步找到了出路。{lastLevel ? '十段旅程已完成，随时回来再挑战。' : '每一个小步，都离终点更近。'}</DialogDescription>
      <div className="grid gap-2">{onNext && <Button onClick={onNext}>下一关 <ArrowRight /></Button>}<Button variant="outline" onClick={onReplay}><RotateCcw /> 重玩本关</Button><Button variant="ghost" onClick={onHome}>{lastLevel ? '完成旅程，返回首页' : '返回首页'}</Button></div>
    </DialogContent>
  </Dialog>
}
