import { useEffect, useState } from 'react'

export function usePortrait() {
  const [portrait, setPortrait] = useState(() => window.matchMedia('(orientation: portrait)').matches)
  useEffect(() => {
    const media = window.matchMedia('(orientation: portrait)')
    const update = () => setPortrait(media.matches)
    media.addEventListener('change', update)
    update()
    return () => media.removeEventListener('change', update)
  }, [])
  return portrait
}
