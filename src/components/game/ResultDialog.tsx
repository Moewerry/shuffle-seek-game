import { ArrowRight, RotateCcw, Search, Trophy } from 'lucide-react'
import type { Level } from '../../game/types'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; won: boolean; level: Level; targetSlot: number; onReplay: () => void; onHome: () => void; onNext?: () => void; lastLevel: boolean }

export function ResultDialog({ open, won, level, targetSlot, onReplay, onHome, onNext, lastLevel }: Props) {
  const Icon = won ? Trophy : Search
  return <Dialog open={open} onOpenChange={value => { if (!value) onHome() }}>
    <DialogContent>
      <span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Icon className="size-7" /></span>
      <DialogTitle className="pr-6 text-2xl font-bold">{won ? lastLevel ? '十份惊喜，全部找到！' : '找到了，眼力真棒！' : '这次没猜中'}</DialogTitle>
      <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
        {won ? '你成功追踪到了藏着星星的盒子。' : `星星在第 ${Math.floor(targetSlot / level.width) + 1} 行、第 ${targetSlot % level.width + 1} 列。再观察一遍，下一次一定更有把握。`}
        {won && lastLevel && '十关挑战已全部完成。'}
      </DialogDescription>
      <div className="grid gap-2">
        {won && onNext && <Button onClick={onNext}>下一关 <ArrowRight /></Button>}
        <Button variant={won ? 'outline' : 'default'} onClick={onReplay}><RotateCcw />{won ? '再玩本关' : '重新观察，再试一次'}</Button>
        <Button variant="ghost" onClick={onHome}>返回首页</Button>
      </div>
    </DialogContent>
  </Dialog>
}
