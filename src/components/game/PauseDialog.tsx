import { Home, Pause, Play, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; onResume: () => void; onReset: () => void; onHome: () => void }

export function PauseDialog({ open, onResume, onReset, onHome }: Props) {
  return <Dialog open={open} onOpenChange={value => { if (!value) onResume() }}>
    <DialogContent aria-describedby={undefined}>
      <Pause className="size-8 text-primary" />
      <DialogTitle className="text-2xl font-bold">已暂停</DialogTitle>
      <div className="grid gap-2"><Button onClick={onResume}><Play /> 继续游戏</Button><Button variant="outline" onClick={onReset}><RotateCcw /> 重新开始</Button><Button variant="ghost" onClick={onHome}><Home /> 返回首页</Button></div>
    </DialogContent>
  </Dialog>
}
