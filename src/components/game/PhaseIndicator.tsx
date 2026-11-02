import { Eye, Hand, Shuffle, Star } from 'lucide-react'
import type { Phase } from '../../game/types'

const labels: Record<Phase, string> = {
  preview: '记住星星的位置', covering: '盖上盒子，准备交换', shuffling: '盯紧目标盒子',
  choosing: '星星藏在哪里？点一个盒子', won: '找到了，就是它！', lost: '差一点，再观察一次',
}

export function PhaseIndicator({ phase, paused, cursor, total }: { phase: Phase; paused: boolean; cursor: number; total: number }) {
  const step = phase === 'preview' ? 0 : phase === 'covering' || phase === 'shuffling' ? 1 : 2
  return <div className="phase-indicator w-full rounded-2xl border bg-card p-4">
    <div className="mb-3 flex items-center justify-between gap-2 text-[10px] text-muted-foreground" aria-hidden="true">
      {[{ Icon: Eye, label: '记住' }, { Icon: Shuffle, label: '打乱' }, { Icon: Hand, label: '揭晓' }].map(({ Icon, label }, index) => <span key={label} className={`flex items-center gap-1 ${index === step ? 'font-bold text-primary' : ''}`}><Icon className="size-3" />{label}</span>)}
    </div>
    <p className="flex items-center gap-2 text-sm font-semibold" role="status" aria-live="polite"><Star className="size-4 shrink-0 text-primary" />{paused ? '已暂停' : labels[phase]}</p>
    <p className="mt-2 text-xs tabular-nums text-muted-foreground">{phase === 'shuffling' ? `交换进度 ${cursor} / ${total}` : phase === 'choosing' ? '可以选择任意一个盒子' : '星星会跟随它藏身的盒子移动'}</p>
    <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted" aria-hidden="true"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${(phase === 'preview' || phase === 'covering' ? 0 : cursor / total) * 100}%` }} /></div>
  </div>
}
