import { useCallback, useState } from 'react'
import { Route } from 'lucide-react'
import { Home } from './components/Home'
import { LevelSelect } from './components/LevelSelect'
import { GameScreen } from './components/game/GameScreen'
import { levels } from './game/levels'

export default function App() {
  const [screen, setScreen] = useState<'home' | 'levels' | 'game'>('home')
  const [levelId, setLevelId] = useState(1)
  const [unlocked, setUnlocked] = useState(1)
  const [completed, setCompleted] = useState<number[]>([])
  const complete = useCallback((id: number) => {
    setUnlocked(value => Math.max(value, Math.min(id + 1, levels.length)))
    setCompleted(value => value.includes(id) ? value : [...value, id])
  }, [])
  const openLevel = (id: number) => {
    if (id < 1 || id > unlocked || id > levels.length) return
    setLevelId(id)
    setScreen('game')
  }
  const level = levels[levelId - 1]
  return <div className="app-shell">
    <header className="flex items-center justify-between gap-3"><button onClick={() => setScreen('home')} className="flex min-h-11 items-center gap-2 rounded-lg font-bold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="返回首页"><Route className="size-5 text-primary" /> shuffle seek<span className="rounded-full bg-secondary px-2 py-1 text-[10px] tracking-wider">PLAY</span></button><span className="text-xs text-muted-foreground">一步一格，自在闯关</span></header>
    {screen === 'home' && <Home onStart={() => openLevel(unlocked)} onSelect={() => setScreen('levels')} />}
    {screen === 'levels' && <LevelSelect unlocked={unlocked} completed={completed} onSelect={openLevel} onHome={() => setScreen('home')} />}
    {screen === 'game' && <GameScreen key={level.id} level={level} total={levels.length} onHome={() => setScreen('home')} onComplete={complete} onNext={level.id < levels.length ? () => openLevel(level.id + 1) : undefined} />}
    <footer className="flex justify-between text-[10px] tracking-wide text-muted-foreground"><span>SHUFFLE SEEK / 平移闯关</span><span>慢一点，也能到达。</span></footer>
  </div>
}
