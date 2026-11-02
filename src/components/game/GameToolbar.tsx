import { Settings } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../ui/button'

export function GameToolbar({ onSettings, disabled = false, children }: { onSettings: () => void; disabled?: boolean; children?: ReactNode }) {
  return <header className="flex items-center justify-between gap-3">
    <div>{children}</div>
    <Button variant="ghost" size="icon" disabled={disabled} onClick={onSettings} aria-label="打开游戏设置" title="游戏设置"><Settings aria-hidden="true" /></Button>
  </header>
}
