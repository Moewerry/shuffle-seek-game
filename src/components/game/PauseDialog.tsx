import { Home, Pause, Play, RotateCcw } from 'lucide-react'
import { Button } from '../ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'

type Props = { open: boolean; onResume: () => void; onReset: () => void; onHome: () => void }

export function PauseDialog({ open, onResume, onReset, onHome }: Props) {
  return <Dialog open={open} onOpenChange={value => { if (!value) onResume() }}>
    <DialogContent>
      <Pause className="size-8 text-primary" />
      <DialogTitle className="text-2xl font-bold">歇一小会儿</DialogTitle>
      <DialogDescription className="text-sm text-muted-foreground">游戏已暂停，准备好后再出发。</DialogDescription>
      <div className="grid gap-2"><Button onClick={onResume}><Play /> 继续游戏</Button><Button variant="outline" onClick={onReset}><RotateCcw /> 重新开始</Button><Button variant="ghost" onClick={onHome}><Home /> 返回首页</Button></div>
    </DialogContent>
  </Dialog>
}
