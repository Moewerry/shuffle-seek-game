import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & { fullScreen?: boolean; showClose?: boolean }
>(({ className, children, fullScreen = false, showClose = true, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-foreground/35 backdrop-blur-sm" />
    <DialogPrimitive.Content ref={ref} className={cn('fixed z-50 grid gap-4 overflow-y-auto p-6 focus:outline-none', fullScreen
      ? 'inset-0 h-[var(--game-height)] w-[var(--game-width)] place-content-center bg-background/90'
      : 'left-1/2 top-1/2 max-h-[calc(var(--game-height)*0.85)] w-[min(calc(var(--game-width)*0.9),420px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border bg-card shadow-xl', className)} {...props}>
      {children}
      {showClose && <DialogPrimitive.Close className="absolute right-3 top-3 grid size-11 place-items-center rounded-xl text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="关闭弹窗"><X className="size-4" /></DialogPrimitive.Close>}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = 'DialogContent'
