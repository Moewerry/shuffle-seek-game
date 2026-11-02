import { useEffect, useRef } from 'react'
import type { Level, Position } from '../../game/types'

type Props = { level: Level; position: Position }

export function Board({ level, position }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const draw = () => {
      const size = canvas.clientWidth
      const ratio = window.devicePixelRatio || 1
      canvas.width = Math.round(size * ratio)
      canvas.height = Math.round(size * ratio)
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(ratio, ratio)
      const cell = size / level.width
      const tile = (p: Position, color: string, inset: number) => {
        const gap = cell * inset
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.roundRect(p.x * cell + gap, p.y * cell + gap, cell - gap * 2, cell - gap * 2, cell * 0.14)
        ctx.fill()
      }
      for (let y = 0; y < level.height; y++) {
        for (let x = 0; x < level.width; x++) tile({ x, y }, '#edf0e9', 0.035)
      }
      tile(level.goal, '#d5efb2', 0.09)
      ctx.strokeStyle = '#4c7b27'
      ctx.lineWidth = Math.max(2, cell * 0.045)
      const gx = (level.goal.x + 0.5) * cell
      const gy = (level.goal.y + 0.5) * cell
      ctx.beginPath()
      ctx.arc(gx, gy, cell * 0.18, 0, Math.PI * 2)
      ctx.stroke()
      level.obstacles.forEach(p => {
        tile(p, '#444e50', 0.09)
        ctx.fillStyle = '#84908e'
        ctx.fillRect((p.x + 0.35) * cell, (p.y + 0.47) * cell, cell * 0.3, cell * 0.06)
      })
      tile(position, '#477be8', 0.12)
      ctx.fillStyle = '#ffffff'
      const eye = cell * 0.055
      ctx.beginPath()
      ctx.arc((position.x + 0.38) * cell, (position.y + 0.44) * cell, eye, 0, Math.PI * 2)
      ctx.arc((position.x + 0.62) * cell, (position.y + 0.44) * cell, eye, 0, Math.PI * 2)
      ctx.fill()
    }
    const observer = new ResizeObserver(draw)
    observer.observe(canvas)
    draw()
    return () => observer.disconnect()
  }, [level, position])

  return <div className="board-frame"><canvas ref={canvasRef} role="img" aria-label={`第 ${level.id} 关棋盘，方块位于第 ${position.x + 1} 列、第 ${position.y + 1} 行，终点在第 ${level.goal.x + 1} 列、第 ${level.goal.y + 1} 行`} className="block size-full" /></div>
}
