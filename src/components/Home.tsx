import { ArrowRight, Grid2X2, Route } from 'lucide-react'
import { Button } from './ui/button'

export function Home({ onStart }: { onStart: () => void }) {
  return <main className="home-layout">
    <section className="max-w-lg">
      <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-muted-foreground"><Route className="size-4" /> SMALL STEPS. NEW PATHS.</p>
      <h1 className="text-5xl font-black tracking-tight lg:text-7xl">Shuffle<span className="text-primary"> Seek.</span></h1>
      <p className="mt-3 text-xl font-medium">方寸之间，自有出路。</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">移动小方块，绕开障碍，找到通往终点的路。<br />没有时间限制，按自己的节奏来。</p>
      <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" onClick={onStart}>开始游戏 <ArrowRight /></Button></div>
      <p className="mt-4 text-xs text-muted-foreground">6 × 6 棋盘 · 10 个小挑战 · 无限次尝试</p>
    </section>
    <div className="home-art" aria-hidden="true"><Grid2X2 className="size-12 text-primary/40" /><span className="mt-5 block text-7xl">↗</span><span className="mt-4 block text-sm font-semibold tracking-widest">FIND YOUR WAY</span></div>
  </main>
}
