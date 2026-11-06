import type { Phase } from '../../game/types'
import { createPortal } from 'react-dom'

export function BoardMask({ phase, paused, countdown }: { phase: Phase; paused: boolean; countdown?: number }) {
  if (paused || (phase !== 'ready' && phase !== 'preview')) return null
  if (phase === 'ready') return createPortal(
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black" role="status" aria-live="polite">
      <p className="text-xl font-bold tracking-widest text-white">准备开始</p>
    </div>, document.body)
  return <>
    {createPortal(<div className="fixed inset-0 z-10 bg-black/60" aria-hidden="true" />, document.body)}
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-[inherit]" role="status" aria-live="polite">
    <span className="sr-only">记住亮起的星星位置</span>
    </div>
    {countdown !== undefined && createPortal(<div className="pointer-events-none fixed bottom-6 right-6 z-30" role="status" aria-live="assertive" aria-atomic="true">
      <span className="flex size-10 items-center justify-center font-type text-2xl font-bold tabular-nums text-white" aria-label={`倒数 ${countdown}`}>{countdown}</span>
    </div>, document.body)}
  </>
}
