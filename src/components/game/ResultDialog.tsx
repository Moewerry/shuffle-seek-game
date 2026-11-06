import { RotateCcw, Search } from 'lucide-react'
import type { Level } from '../../game/types'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { SuccessOverlay } from './SuccessOverlay'

type Props = { open: boolean; won: boolean; level: Level; targetSlot: number; onReplay: () => void; onHome: () => void; onNext?: () => void; lastLevel: boolean }

export function ResultDialog({ open, won, level, targetSlot, onReplay, onHome, onNext, lastLevel }: Props) {
  if (won) return <SuccessOverlay open={open} lastLevel={lastLevel} onNext={onNext} onHome={onHome} />
  return <Dialog open={open} onOpenChange={value => { if (!value) onHome() }}>
    <DialogContent className="max-h-[calc(var(--game-height)-24px)] gap-3 overflow-visible p-[clamp(12px,calc(var(--game-height)*0.04),24px)]" aria-describedby="result-description">
      <DialogTitle className="flex items-center gap-3 pr-10 text-2xl font-bold"><Search className="size-7 shrink-0 text-primary" aria-hidden="true" />未找到</DialogTitle>
      <DialogDescription id="result-description" className="text-sm text-muted-foreground">
        星星在第 {Math.floor(targetSlot / level.width) + 1} 行、第 {targetSlot % level.width + 1} 列。
      </DialogDescription>
      <div className="grid gap-2">
        <Button onClick={onReplay}><RotateCcw />重试</Button>
        <Button variant="ghost" onClick={onHome}>返回首页</Button>
      </div>
    </DialogContent>
  </Dialog>
}
