import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/utils'
import { Paper } from '../ui/paper'

type Props = { icon: LucideIcon | null; target?: boolean; wrong?: boolean; guided?: boolean }

export function BoxFace({ icon: Icon, target, wrong, guided }: Props) {
  return <Paper stock={target ? 'sticky-yellow' : wrong ? 'sticky-pink' : 'graph'} rules="none" edge="deckle" tilt={-1.5} shadow="loose" seed="blind-box"
    className={cn('graph-paper box-face', target && 'box-target', wrong && 'box-wrong', guided && 'ring-4 ring-ink-you/40 ring-offset-4')}>
    {Icon && <Icon className={target ? 'fill-current' : undefined} aria-hidden="true" />}
  </Paper>
}
