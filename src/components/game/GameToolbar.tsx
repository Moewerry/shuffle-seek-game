import { Pause, RotateCcw, Undo2 } from 'lucide-react'
import { Button } from '../ui/button'

type Props = { canUndo: boolean; disabled: boolean; onUndo: () => void; onReset: () => void; onPause: () => void }

export function GameToolbar({ canUndo, disabled, onUndo, onReset, onPause }: Props) {
  return <div className="game-toolbar flex flex-wrap gap-2">
    <Button variant="outline" size="sm" disabled={!canUndo || disabled} onClick={onUndo} aria-label="撤销一步"><Undo2 /><span>撤销</span></Button>
    <Button variant="outline" size="sm" disabled={disabled} onClick={onReset} aria-label="重置本关"><RotateCcw /><span>重置</span></Button>
    <Button variant="outline" size="sm" disabled={disabled} onClick={onPause} aria-label="暂停游戏"><Pause /><span>暂停</span></Button>
  </div>
}
