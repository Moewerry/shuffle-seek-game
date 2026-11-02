import { useState } from 'react'
import { Route } from 'lucide-react'
import { Home } from './components/Home'
import { GameScreen } from './components/game/GameScreen'
import { levels } from './game/levels'

export default function App() {
  const [playing, setPlaying] = useState(false)
  const level = levels[0]
  return <div className="app-shell">
    <header className="flex items-center justify-between gap-3"><a href="./" className="flex items-center gap-2 font-bold tracking-tight"><Route className="size-5 text-primary" /> shuffle seek<span className="rounded-full bg-secondary px-2 py-1 text-[10px] tracking-wider">PLAY</span></a><span className="text-xs text-muted-foreground">一步一格，自在闯关</span></header>
    {playing ? <GameScreen level={level} total={levels.length} onHome={() => setPlaying(false)} /> : <Home onStart={() => setPlaying(true)} />}
    <footer className="flex justify-between text-[10px] tracking-wide text-muted-foreground"><span>SHUFFLE SEEK / 平移闯关</span><span>慢一点，也能到达。</span></footer>
  </div>
}
