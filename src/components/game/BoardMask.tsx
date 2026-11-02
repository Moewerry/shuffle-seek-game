import type { Phase } from '../../game/types'

export function BoardMask({ phase, paused }: { phase: Phase; paused: boolean }) {
  if (paused || (phase !== 'ready' && phase !== 'preview')) return null
  return <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-[#14251f]/80" role="status" aria-live="polite">
    {phase === 'ready' && <p className="text-xl font-bold tracking-widest text-white">准备开始</p>}
    {phase === 'preview' && <span className="sr-only">记住亮起的星星位置</span>}
  </div>
}
