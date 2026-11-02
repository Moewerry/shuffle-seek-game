import { Settings } from 'lucide-react'
import { Button } from '../ui/button'

export function GameToolbar({ onSettings, disabled = false }: { onSettings: () => void; disabled?: boolean }) {
  return <header className="flex justify-end">
    <Button variant="ghost" size="icon" disabled={disabled} onClick={onSettings} aria-label="打开游戏设置" title="游戏设置"><Settings aria-hidden="true" /></Button>
  </header>
}
