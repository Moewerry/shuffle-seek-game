import type { Phase } from '../../game/types'
import { createPortal } from 'react-dom'

export function BoardMask({ phase, paused, countdown }: { phase: Phase; paused: boolean; countdown?: number }) {
  if (paused || (phase !== 'ready' && phase !== 'preview')) return null
  return <>
    {createPortal(<div className="fixed inset-0 z-10 bg-[#2a2420]/80" aria-hidden="true" />, document.body)}
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[inherit] bg-[#2a2420]/80" role="status" aria-live="polite">
    {phase === 'ready' && <p className="text-xl font-bold tracking-widest text-white">准备开始</p>}
    {phase === 'preview' && <span className="sr-only">记住亮起的星星位置</span>}
    </div>
    {phase === 'preview' && countdown !== undefined && createPortal(<div className="pointer-events-none fixed bottom-6 right-6 z-30" role="status" aria-live="assertive" aria-atomic="true">
      <span className="flex size-10 items-center justify-center font-type text-2xl font-bold tabular-nums text-white" aria-label={`倒数 ${countdown}`}>{countdown}</span>
    </div>, document.body)}
  </>
}
