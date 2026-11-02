import { useState } from 'react'
import { Route, Volume2, VolumeX } from 'lucide-react'
import { Home } from './components/Home'
import { GameScreen } from './components/game/GameScreen'
import { TutorialScreen } from './components/game/TutorialScreen'
import { levels } from './game/levels'
import { useProgress } from './hooks/useProgress'
import { Button } from './components/ui/button'

export default function App() {
  const [screen, setScreen] = useState<'home' | 'game' | 'tutorial'>('home')
  const [levelId, setLevelId] = useState(1)
  const { unlocked, sound, storageAvailable, tutorialCompleted, complete, toggleSound, completeTutorial } = useProgress()
  const openLevel = (id: number) => {
    if (id < 1 || id > unlocked || id > levels.length) return
    setLevelId(id)
    setScreen('game')
  }
  const level = levels[levelId - 1]
  return <div className="app-shell">
    <header className="flex items-center justify-between gap-3"><Button variant="ghost" onClick={() => setScreen('home')} className="px-0 font-bold tracking-tight text-foreground" aria-label="返回首页"><Route className="size-5 text-primary" /> shuffle seek</Button><Button variant="ghost" size="sm" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? '关闭音效' : '开启音效'}>{sound ? <Volume2 /> : <VolumeX />}<span>音效{sound ? '开' : '关'}</span></Button></header>
    {screen === 'home' && <Home onStart={() => tutorialCompleted ? openLevel(unlocked) : setScreen('tutorial')} onTutorial={() => setScreen('tutorial')} currentLevel={unlocked} />}
    {screen === 'tutorial' && <TutorialScreen sound={sound} onHome={() => setScreen('home')} onFinish={() => { completeTutorial(); openLevel(unlocked) }} />}
    {screen === 'game' && <GameScreen key={level.id} level={level} total={levels.length} sound={sound} onHome={() => setScreen('home')} onComplete={complete} onNext={level.id < levels.length ? () => openLevel(level.id + 1) : undefined} />}
    <footer className="flex justify-between gap-3 text-[10px] tracking-wide text-muted-foreground"><span role="status">{!storageAvailable && '进度无法保存'}</span></footer>
  </div>
}
