import type { Level } from '../../game/types'
import { cn } from '../../lib/utils'
import { LevelStamp } from './LevelStamp'

export function LevelBrief({ level, masked }: { level: Level; masked: boolean }) {
  return <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
    <LevelStamp level={level.id} masked={masked} />
    <div className={cn('min-w-0', masked ? 'text-white' : 'text-foreground')}>
      <h2 className="text-sm font-bold">
        {level.title}
        <span className="ml-3 inline-block text-xs font-normal opacity-80">{level.width} × {level.height} · {level.swaps} 次移动</span>
      </h2>
      <p className="mt-1 text-xs leading-relaxed opacity-90">{level.hint}</p>
    </div>
  </div>
}
