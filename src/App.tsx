import { useState } from 'react'
import { Route } from 'lucide-react'
import { Home } from './components/Home'
import { GameScreen } from './components/game/GameScreen'
import { TutorialScreen } from './components/game/TutorialScreen'
import { levels } from './game/levels'
import { useProgress } from './hooks/useProgress'
import { SettingsDialog } from './components/SettingsDialog'

export default function App() {
  const [screen, setScreen] = useState<'home' | 'game' | 'tutorial'>('home')
  const [levelId, setLevelId] = useState(1)
  const { unlocked, sound, storageAvailable, complete, toggleSound, completeTutorial } = useProgress()
  const openLevel = (id: number) => {
    if (id < 1 || id > unlocked || id > levels.length) return
    setLevelId(id)
    setScreen('game')
  }
  const level = levels[levelId - 1]
  return <div className={`app-shell ${screen !== 'home' ? 'app-shell-playing' : ''}`}>
    {screen === 'home' && <header className="flex items-center justify-between gap-3"><div className="flex items-center gap-2 font-bold tracking-tight text-foreground"><Route className="size-5 text-primary" /> shuffle seek</div><SettingsDialog sound={sound} onToggleSound={toggleSound} /></header>}
    {screen === 'home' && <Home onStart={() => openLevel(unlocked)} onTutorial={() => setScreen('tutorial')} currentLevel={unlocked} />}
    {screen === 'tutorial' && <TutorialScreen sound={sound} onHome={() => setScreen('home')} onFinish={() => { completeTutorial(); setScreen('home') }} />}
    {screen === 'game' && <GameScreen key={level.id} level={level} total={levels.length} sound={sound} onHome={() => setScreen('home')} onComplete={complete} onNext={level.id < levels.length ? () => openLevel(level.id + 1) : undefined} />}
    {!storageAvailable && <footer className="text-[10px] tracking-wide text-muted-foreground" role="status">进度无法保存</footer>}
  </div>
}

