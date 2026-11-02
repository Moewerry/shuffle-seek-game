import { useCallback, useEffect, useRef } from 'react'

export function useSound(enabled: boolean) {
  const context = useRef<AudioContext | null>(null)
  useEffect(() => () => { void context.current?.close().catch(() => {}); context.current = null }, [])
  return useCallback((won = false) => {
    if (!enabled || typeof AudioContext === 'undefined') return
    try {
      const audio = context.current ?? (context.current = new AudioContext())
      const play = () => {
        if (audio.state !== 'running') return
        const now = audio.currentTime
        const oscillator = audio.createOscillator()
        const gain = audio.createGain()
        oscillator.type = 'sine'
        oscillator.frequency.setValueAtTime(won ? 660 : 440, now)
        if (won) oscillator.frequency.setValueAtTime(880, now + 0.1)
        gain.gain.setValueAtTime(0, now)
        gain.gain.linearRampToValueAtTime(0.055, now + 0.01)
        gain.gain.exponentialRampToValueAtTime(0.001, now + (won ? 0.28 : 0.09))
        oscillator.connect(gain)
        gain.connect(audio.destination)
        oscillator.start(now)
        oscillator.stop(now + 0.3)
        oscillator.onended = () => { oscillator.disconnect(); gain.disconnect() }
      }
      if (audio.state === 'suspended') void audio.resume().then(play).catch(() => {})
      else play()
    } catch {
      // Audio is optional; unavailable browser audio must not interrupt a round.
    }
  }, [enabled])
}
