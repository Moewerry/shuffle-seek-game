import { ArrowRight, RotateCcw, Search, Trophy } from 'lucide-react'
import type { Level } from '../../game/types'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; won: boolean; level: Level; targetSlot: number; onReplay: () => void; onHome: () => void; onNext?: () => void; lastLevel: boolean }

export function ResultDialog({ open, won, level, targetSlot, onReplay, onHome, onNext, lastLevel }: Props) {
  const Icon = won ? Trophy : Search
  return <Dialog open={open} onOpenChange={value => { if (!value) onHome() }}>
    <DialogContent aria-describedby={won ? undefined : "result-description"}>
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-7" /></span>
      <DialogTitle className="pr-6 text-2xl font-bold">{won ? lastLevel ? '全部通关' : '找到了' : '未找到'}</DialogTitle>
      {!won && <DialogDescription id="result-description" className="text-sm text-muted-foreground">
        星星在第 {Math.floor(targetSlot / level.width) + 1} 行、第 {targetSlot % level.width + 1} 列。
      </DialogDescription>}
      <div className="grid gap-2">
        {won && onNext && <Button onClick={onNext}>下一关 <ArrowRight /></Button>}
        <Button variant={won ? 'outline' : 'default'} onClick={onReplay}><RotateCcw />{won ? '再玩本关' : '重试'}</Button>
        <Button variant="ghost" onClick={onHome}>返回首页</Button>
      </div>
    </DialogContent>
  </Dialog>
}
