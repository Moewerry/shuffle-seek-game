import { Eye, Hand, Shuffle, Star } from 'lucide-react'
import type { LineShift, Phase } from '../../game/types'

const labels: Record<Phase, string> = {
  preview: '记住星星的位置', covering: '准备打乱', prompt: '点击高亮的盒子', shuffling: '打乱中',
  choosing: '选择盒子', won: '找到了', lost: '未找到',
}

export function PhaseIndicator({ phase, paused, cursor, total, shift }: { phase: Phase; paused: boolean; cursor: number; total: number; shift: LineShift | null }) {
  const step = phase === 'preview' ? 0 : phase === 'covering' || phase === 'shuffling' ? 1 : 2
  const movement = shift ? `第 ${shift.index + 1} ${shift.axis === 'row' ? '行' : '列'}向${shift.axis === 'row' ? shift.direction === 1 ? '右 →' : '左 ←' : shift.direction === 1 ? '下 ↓' : '上 ↑'}平移` : '准备开始平移'
  return <div className="phase-indicator w-full rounded-2xl border bg-card p-4">
    <div className="mb-3 flex items-center justify-between gap-2 text-[10px] text-muted-foreground" aria-hidden="true">
      {[{ Icon: Eye, label: '记住' }, { Icon: Shuffle, label: '打乱' }, { Icon: Hand, label: '揭晓' }].map(({ Icon, label }, index) => <span key={label} className={`flex items-center gap-1 ${index === step ? 'font-bold text-primary' : ''}`}><Icon className="size-3" />{label}</span>)}
    </div>
    <p className="flex items-center gap-2 text-sm font-semibold" role="status" aria-live="polite"><Star className="size-4 shrink-0 text-primary" />{paused ? '已暂停' : phase === 'shuffling' ? movement : labels[phase]}</p>
    {phase === 'shuffling' && <p className="mt-2 text-xs tabular-nums text-muted-foreground">{cursor} / {total}</p>}
    <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted" aria-hidden="true"><div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${(phase === 'preview' || phase === 'covering' ? 0 : cursor / total) * 100}%` }} /></div>
  </div>
}
