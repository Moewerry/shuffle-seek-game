import { Settings } from 'lucide-react'
import type { ReactNode } from 'react'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'

export function GameToolbar({ onSettings, disabled = false, masked = false, children }: { onSettings: () => void; disabled?: boolean; masked?: boolean; children?: ReactNode }) {
  return <header className="flex items-center justify-between gap-3">
    <div className="relative z-30">{children}</div>
    <Button className={cn('relative z-30 border-0 bg-transparent shadow-none [&>svg[data-ink]]:hidden focus-visible:outline-2 focus-visible:outline-offset-2', masked && 'text-white/70 hover:text-white')} variant="ghost" size="icon" disabled={disabled} onClick={onSettings} aria-label="打开游戏设置" title="游戏设置"><Settings aria-hidden="true" /></Button>
  </header>
}
