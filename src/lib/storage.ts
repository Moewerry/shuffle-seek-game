import { levels } from '../game/levels'

// Separate the new memory game from the previous movement game's progress.
const KEY = 'shuffle-seek:blind-box:progress:v1'
export type Progress = { version: 1; unlocked: number; completed: number[]; sound: boolean; tutorialCompleted: boolean }
const defaults: Progress = { version: 1, unlocked: 1, completed: [], sound: true, tutorialCompleted: false }

export function readProgress(): Progress {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(KEY) || 'null')
    if (!raw || typeof raw !== 'object') return defaults
    const data = raw as Partial<Progress>
    if (data.version !== 1) return defaults
    const unlocked = typeof data.unlocked === 'number' && Number.isInteger(data.unlocked)
      ? Math.min(levels.length, Math.max(1, data.unlocked)) : 1
    const completed = Array.isArray(data.completed)
      ? [...new Set(data.completed.filter((id): id is number => typeof id === 'number' && Number.isInteger(id) && id >= 1 && id <= unlocked && (id < unlocked || id === levels.length)))] : []
    return { version: 1, unlocked, completed, sound: typeof data.sound === 'boolean' ? data.sound : true, tutorialCompleted: data.tutorialCompleted === true }
  } catch {
    return defaults
  }
}

export function writeProgress(progress: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(progress))
    return true
  } catch {
    return false
  }
}
