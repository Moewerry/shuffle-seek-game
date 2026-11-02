import { useCallback, useEffect, useState } from 'react'
import { levels } from '../game/levels'
import { readProgress, writeProgress } from '../lib/storage'

export function useProgress() {
  const [progress, setProgress] = useState(readProgress)
  const [storageAvailable, setStorageAvailable] = useState(true)
  useEffect(() => { setStorageAvailable(writeProgress(progress)) }, [progress])
  const complete = useCallback((id: number) => {
    setProgress(value => value.completed.includes(id) ? value : {
      ...value,
      unlocked: Math.max(value.unlocked, Math.min(id + 1, levels.length)),
      completed: [...value.completed, id],
    })
  }, [])
  const toggleSound = useCallback(() => setProgress(value => ({ ...value, sound: !value.sound })), [])
  return { ...progress, storageAvailable, complete, toggleSound }
}
