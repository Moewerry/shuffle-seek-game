import { useEffect } from 'react'

export function useAutoPause(pause: () => void) {
  useEffect(() => {
    const onVisibility = () => { if (document.hidden) pause() }
    const orientation = window.matchMedia('(orientation: portrait)')
    const onOrientation = () => { if (orientation.matches) pause() }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !event.defaultPrevented) pause()
    }
    window.addEventListener('blur', pause)
    window.addEventListener('keydown', onKey)
    document.addEventListener('visibilitychange', onVisibility)
    orientation.addEventListener('change', onOrientation)
    onOrientation()
    return () => {
      window.removeEventListener('blur', pause)
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('visibilitychange', onVisibility)
      orientation.removeEventListener('change', onOrientation)
    }
  }, [pause])
}
