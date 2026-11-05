import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Paper } from '../ui/paper'

type Props = { icon: LucideIcon; target?: boolean; wrong?: boolean; empty?: boolean; guided?: boolean }

export function BoxFace({ icon: Icon, target, wrong, empty, guided }: Props) {
  return <Paper stock={target ? 'sticky-yellow' : wrong ? 'sticky-pink' : 'card'} edge="deckle" tilt={false} shadow="none" seed="blind-box"
    className={cn('box-face', target && 'box-target', wrong && 'box-wrong', empty && 'box-empty', guided && 'ring-4 ring-ink-you/40 ring-offset-4')}>
    <Icon className={target ? 'fill-current' : undefined} aria-hidden="true" />
  </Paper>
}
