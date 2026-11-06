import type { Level } from './types'
import data from '../data/levels.json'

export const levels: Level[] = data.map<Level>(({ pattern, ...settings }) => {
  if (pattern !== 'rows' && pattern !== 'columns' && pattern !== 'alternating' && pattern !== 'mixed') {
    throw new Error(`第 ${settings.id} 关的移动模式无效：${pattern}`)
  }
  return { ...settings, pattern }
})
