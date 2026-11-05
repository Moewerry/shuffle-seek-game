import { useState } from 'react'
import { Settings, Volume2, VolumeX } from 'lucide-react'
import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle } from './ui/dialog'

export function SettingsDialog({ sound, onToggleSound }: { sound: boolean; onToggleSound: () => void }) {
  const [open, setOpen] = useState(false)
  return <>
    <Button variant="ghost" size="icon" className="[&_[data-layer=rest]]:hidden" onClick={() => setOpen(true)} aria-label="打开设置" title="设置"><Settings className="size-5" aria-hidden="true" /></Button>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[min(calc(var(--game-width)*0.9),300px)]" aria-describedby={undefined}>
        <DialogTitle className="flex items-center gap-3 pr-10 text-2xl font-bold"><Settings className="size-7 shrink-0 text-primary" aria-hidden="true" />设置</DialogTitle>
        <Button variant="outline" className="h-14 justify-between" onClick={onToggleSound} aria-pressed={sound} aria-label={sound ? '音效开，点击关闭音效' : '音效关，点击开启音效'}>
          <span className="flex items-center gap-3">{sound ? <Volume2 /> : <VolumeX />}音效</span>
          <span className={`rounded-full px-3 py-1 text-xs ${sound ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{sound ? '开启' : '关闭'}</span>
        </Button>
      </DialogContent>
    </Dialog>
  </>
}


