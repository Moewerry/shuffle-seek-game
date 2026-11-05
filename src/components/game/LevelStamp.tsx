import { cn } from '../../lib/utils'

const levelNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

export function LevelStamp({ level, masked }: { level: number; masked: boolean }) {
  return <h1 className={cn(
    'inline-flex -rotate-3 items-center rounded-[3px_5px_2px_4px] border-[3px] border-double border-current px-3 py-1 font-hand text-base font-bold tracking-[0.18em]',
    masked ? 'text-[#ffb4a3]' : 'text-primary',
  )}>
    第{levelNumbers[level - 1] ?? level}关
  </h1>
}
