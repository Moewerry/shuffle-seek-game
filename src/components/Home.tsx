import { ArrowRight, Grid2X2, Route } from 'lucide-react'
import { Button } from './ui/button'

export function Home({ onStart, currentLevel }: { onStart: () => void; currentLevel: number }) {
  return <main className="home-layout">
    <section className="max-w-lg">
      <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-muted-foreground"><Route className="size-4" /> WATCH. SHUFFLE. FIND.</p>
      <h1 className="text-5xl font-black tracking-tight lg:text-7xl">Shuffle<span className="text-primary"> Seek.</span></h1>
      <p className="mt-3 text-xl font-medium">看准那颗星，打开小惊喜。</p>
      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">先记住目标，看盒子交换位置。<br />打乱之后，点开你认为藏着星星的那个。</p>
      <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" onClick={onStart}>{currentLevel > 1 ? '继续闯关' : '开始游戏'} <ArrowRight /></Button><span className="self-center text-xs text-muted-foreground">当前进度 · 第 {currentLevel} / 10 关</span></div>
      <p className="home-caption mt-4 text-xs text-muted-foreground">10 关记忆挑战 · 看清交换 · 点击揭晓</p>
    </section>
    <div className="home-art" aria-hidden="true"><Grid2X2 className="size-12 text-primary/40" /><span className="mt-5 block text-7xl">★</span><span className="mt-4 block text-sm font-semibold tracking-widest">FIND THE SURPRISE</span></div>
  </main>
}
