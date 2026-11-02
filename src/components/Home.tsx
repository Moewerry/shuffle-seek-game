import { ArrowRight, Grid2X2 } from 'lucide-react'
import { Button } from './ui/button'

export function Home({ onStart, currentLevel }: { onStart: () => void; currentLevel: number }) {
  return <main className="home-layout">
    <section className="max-w-lg">
      <h1 className="text-5xl font-black tracking-tight lg:text-7xl">Shuffle<span className="text-primary"> Seek.</span></h1>
      <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" onClick={onStart}>{currentLevel > 1 ? '继续闯关' : '开始游戏'} <ArrowRight /></Button><span className="self-center text-xs text-muted-foreground">当前进度 · 第 {currentLevel} / 10 关</span></div>
    </section>
    <div className="home-art" aria-hidden="true"><Grid2X2 className="size-12 text-primary/40" /><span className="mt-5 block text-7xl">★</span></div>
  </main>
}
