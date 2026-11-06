import type { Level } from '../../game/types'
import { LevelStamp } from './LevelStamp'

export function LevelBrief({ level, masked }: { level: Level; masked: boolean }) {
  return <LevelStamp level={level.id} masked={masked} />
}
