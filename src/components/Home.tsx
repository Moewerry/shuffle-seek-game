import { ArrowRight, BookOpen, Grid2X2 } from 'lucide-react'
import { Button } from './ui/button'

export function Home({ onStart, onTutorial, currentLevel }: { onStart: () => void; onTutorial: () => void; currentLevel: number }) {
  return <main className="home-layout">
    <section className="flex min-w-0 flex-col items-center text-center">
      <h1 className="home-title font-black tracking-tight">Shuffle<span className="text-primary"> Seek.</span></h1>
      <div className="home-actions mt-7 grid w-full max-w-sm gap-3">
        <Button size="lg" className="w-full px-4" onClick={onStart}>{currentLevel > 1 ? '继续闯关' : '开始游戏'} <ArrowRight /></Button>
      </div>
    </section>
    <div className="home-art" aria-hidden="true"><Grid2X2 className="size-12 text-primary/40" /><span className="mt-5 block text-7xl">★</span></div>
    <Button variant="ghost" size="icon" className="home-tutorial" onClick={onTutorial} aria-label="新手教程" title="新手教程"><BookOpen aria-hidden="true" /></Button>
  </main>
}
