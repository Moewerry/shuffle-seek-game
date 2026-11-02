import { Home, Settings, Play, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; onResume: () => void; onReset: () => void; onHome: () => void }

export function PauseDialog({ open, onResume, onReset, onHome }: Props) {
  return <Dialog open={open} onOpenChange={value => { if (!value) onResume() }}>
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className="flex items-center gap-3 pr-10 text-2xl font-bold"><Settings className="size-7 shrink-0 text-primary" aria-hidden="true" />游戏设置</DialogTitle>
      <div className="grid gap-2">
        <div className="grid grid-cols-2 gap-2">
          <Button className="px-3" onClick={onResume}><Play />继续游戏</Button>
          <Button variant="outline" className="px-3" onClick={onReset}><RotateCcw />重新观察</Button>
        </div>
        <Button variant="ghost" onClick={onHome}><Home />返回首页</Button>
      </div>
    </DialogContent>
  </Dialog>
}
