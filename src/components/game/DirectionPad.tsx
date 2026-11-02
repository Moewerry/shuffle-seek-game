import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { Button } from '../ui/button'
import type { Direction } from '../../game/types'

export function DirectionPad({ onMove, disabled = false }: { onMove: (direction: Direction) => void; disabled?: boolean }) {
  return <div className="direction-pad" role="group" aria-label="移动方向">
    <Button variant="outline" className="col-start-2" disabled={disabled} onClick={() => onMove('up')} aria-label="向上移动"><ArrowUp /></Button>
    <Button variant="outline" className="row-start-2" disabled={disabled} onClick={() => onMove('left')} aria-label="向左移动"><ArrowLeft /></Button>
    <span className="col-start-2 row-start-2 grid place-items-center text-xs text-muted-foreground" aria-hidden="true">MOVE</span>
    <Button variant="outline" className="col-start-3 row-start-2" disabled={disabled} onClick={() => onMove('right')} aria-label="向右移动"><ArrowRight /></Button>
    <Button variant="outline" className="col-start-2 row-start-3" disabled={disabled} onClick={() => onMove('down')} aria-label="向下移动"><ArrowDown /></Button>
  </div>
}
