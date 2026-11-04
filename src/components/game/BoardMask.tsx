import type { Phase } from '../../game/types'

export function BoardMask({ phase, paused, countdown }: { phase: Phase; paused: boolean; countdown?: number }) {
  if (paused || (phase !== 'ready' && phase !== 'preview')) return null
  return <>
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-[#14251f]/80" role="status" aria-live="polite">
    {phase === 'ready' && <p className="text-xl font-bold tracking-widest text-white">准备开始</p>}
    {phase === 'preview' && <span className="sr-only">记住亮起的星星位置</span>}
    </div>
    {phase === 'preview' && countdown !== undefined && <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center" role="status" aria-live="assertive" aria-atomic="true">
      <span className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-[#14251f] text-2xl font-bold tabular-nums text-white shadow-lg" aria-label={`倒数 ${countdown}`}>{countdown}</span>
    </div>}
  </>
}
