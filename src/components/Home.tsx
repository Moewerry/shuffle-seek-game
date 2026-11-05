import { ArrowRight, BookOpen } from 'lucide-react'
import { Button } from './ui/button'
import { HomeArtwork } from './home/HomeArtwork'

export function Home({ onStart, onTutorial, currentLevel }: { onStart: () => void; onTutorial: () => void; currentLevel: number }) {
  return <main className="home-layout">
    <section className="flex min-w-0 flex-col items-center text-center">
      <p className="home-eyebrow mb-3 text-xs tracking-[0.2em] text-muted-foreground">盲盒寻星 · 记忆小游戏</p>
      <h1 className="home-title font-script font-bold tracking-tight">Shuffle<span className="home-title-mark"> Seek.</span></h1>
      <p className="home-description mt-4 text-sm text-muted-foreground">记住星星，跟上移动，再把它找出来。</p>
      <div className="home-actions mt-7 grid w-full max-w-sm gap-3">
        <Button size="lg" className="w-full px-4" onClick={onStart}>{currentLevel > 1 ? '继续闯关' : '开始游戏'} <ArrowRight /></Button>
      </div>
    </section>
    <HomeArtwork />
    <Button variant="ghost" size="icon" className="home-tutorial" onClick={onTutorial} aria-label="新手教程" title="新手教程"><BookOpen aria-hidden="true" /></Button>
  </main>
}
