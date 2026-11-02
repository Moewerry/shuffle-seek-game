import { useState } from 'react'
import { ArrowLeft, Route } from 'lucide-react'
import { Home } from './components/Home'
import { Board } from './components/game/Board'
import { DirectionPad } from './components/game/DirectionPad'
import { Button } from './components/ui/button'
import { levels } from './game/levels'

export default function App() {
  const [playing, setPlaying] = useState(false)
  const level = levels[0]
  return <div className="app-shell">
    <header className="flex items-center justify-between gap-3"><a href="./" className="flex items-center gap-2 font-bold tracking-tight"><Route className="size-5 text-primary" /> shuffle seek<span className="rounded-full bg-secondary px-2 py-1 text-[10px] tracking-wider">PLAY</span></a><span className="text-xs text-muted-foreground">一步一格，自在闯关</span></header>
    {playing ? <main className="game-layout">
      <section className="board-area"><Board level={level} position={level.start} /></section>
      <aside className="game-sidebar"><div><p className="text-xs font-bold tracking-widest text-primary">LEVEL 01 / 10</p><h1 className="mt-2 text-2xl font-bold">{level.title}</h1><p className="mt-2 text-sm text-muted-foreground">{level.hint}</p></div><p className="text-sm">移动步数 <strong className="ml-2 text-2xl tabular-nums">0</strong></p><DirectionPad onMove={() => {}} /><Button variant="ghost" onClick={() => setPlaying(false)}><ArrowLeft /> 返回首页</Button></aside>
    </main> : <Home onStart={() => setPlaying(true)} />}
    <footer className="flex justify-between text-[10px] tracking-wide text-muted-foreground"><span>SHUFFLE SEEK / 平移闯关</span><span>慢一点，也能到达。</span></footer>
  </div>
}
