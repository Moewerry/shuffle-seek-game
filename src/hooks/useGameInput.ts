import { useEffect, useRef, type PointerEvent } from 'react'
import type { Direction } from '../game/types'

const keys: Record<string, Direction> = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }
const isLandscape = () => window.matchMedia('(orientation: landscape)').matches

export function useGameInput(active: boolean, move: (direction: Direction) => void, pause: () => void) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null)
  useEffect(() => {
    if (!active) { start.current = null; return }
    const onKey = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || !isLandscape()) return
      const target = event.target
      if (target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))) return
      if (event.key === 'Escape') { event.preventDefault(); pause(); return }
      const direction = keys[event.key]
      if (!direction) return
      event.preventDefault()
      if (!event.repeat) move(direction)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, move, pause])

  useEffect(() => {
    const loseFocus = () => { start.current = null; pause() }
    const onVisibility = () => { if (document.hidden) loseFocus() }
    const orientation = window.matchMedia('(orientation: portrait)')
    const onOrientation = () => { if (orientation.matches) loseFocus() }
    window.addEventListener('blur', loseFocus)
    document.addEventListener('visibilitychange', onVisibility)
    orientation.addEventListener('change', onOrientation)
    return () => {
      window.removeEventListener('blur', loseFocus)
      document.removeEventListener('visibilitychange', onVisibility)
      orientation.removeEventListener('change', onOrientation)
    }
  }, [pause])

  return {
    onPointerDown: (event: PointerEvent<HTMLElement>) => {
      if (!active || !isLandscape() || !event.isPrimary || event.button !== 0) return
      start.current = { x: event.clientX, y: event.clientY, id: event.pointerId }
      event.currentTarget.setPointerCapture(event.pointerId)
    },
    onPointerUp: (event: PointerEvent<HTMLElement>) => {
      const origin = start.current
      if (!origin || origin.id !== event.pointerId) return
      start.current = null
      if (!active || !isLandscape()) return
      const dx = event.clientX - origin.x
      const dy = event.clientY - origin.y
      if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) return
      move(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'))
    },
    onPointerCancel: () => { start.current = null },
    onLostPointerCapture: () => { start.current = null },
  }
}
