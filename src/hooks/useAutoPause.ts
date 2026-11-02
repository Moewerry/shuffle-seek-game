import { useEffect } from 'react'

export function useAutoPause(pause: () => void) {
  useEffect(() => {
    const onVisibility = () => { if (document.hidden) pause() }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) pause()
    }
    window.addEventListener('blur', pause)
    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      window.removeEventListener('blur', pause)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [pause])
}
