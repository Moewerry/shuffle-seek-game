import { ArrowLeft, Check, Lock, Play } from 'lucide-react'
import { levels } from '../game/levels'
import { Button } from './ui/button'

type Props = { unlocked: number; completed: number[]; onSelect: (id: number) => void; onHome: () => void }

export function LevelSelect({ unlocked, completed, onSelect, onHome }: Props) {
  return <main className="level-select min-h-0 overflow-y-auto py-2">
    <div className="mb-4 flex items-center justify-between gap-4"><div><p className="text-xs font-bold tracking-widest text-primary">YOUR LITTLE JOURNEY</p><h1 className="mt-1 text-2xl font-bold">选择一段旅程</h1></div><Button variant="ghost" onClick={onHome}><ArrowLeft /> 返回首页</Button></div>
    <div className="grid grid-cols-5 gap-3">{levels.map(level => {
      const locked = level.id > unlocked
      const done = completed.includes(level.id)
      const Icon = locked ? Lock : done ? Check : Play
      return <Button key={level.id} variant={locked ? 'ghost' : 'outline'} disabled={locked} onClick={() => onSelect(level.id)} className="h-auto min-h-24 flex-col gap-1 whitespace-normal px-2 py-3" aria-label={`第 ${level.id} 关，${level.title}，${locked ? '未解锁' : done ? '已完成' : '可挑战'}`}>
        <span className="flex items-center gap-2 text-xl tabular-nums">{String(level.id).padStart(2, '0')}<Icon className="size-3" /></span><span className="text-xs">{level.title}</span><span className="text-[10px] text-muted-foreground">{locked ? '未解锁' : done ? '已完成 · 再挑战' : '可挑战'}</span>
      </Button>
    })}</div>
    <p className="mt-3 text-xs text-muted-foreground">完成当前关卡，解锁下一段旅程。已解锁 {unlocked} / {levels.length} 关。</p>
  </main>
}
