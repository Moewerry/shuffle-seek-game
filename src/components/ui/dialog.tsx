import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '../../lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTitle = DialogPrimitive.Title
export const DialogDescription = DialogPrimitive.Description

export const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-foreground/35 backdrop-blur-sm" />
    <DialogPrimitive.Content ref={ref} className={cn('fixed left-1/2 top-1/2 z-50 grid max-h-[85dvh] w-[min(90vw,420px)] -translate-x-1/2 -translate-y-1/2 gap-4 overflow-y-auto rounded-3xl border bg-card p-6 shadow-xl focus:outline-none', className)} {...props}>
      {children}
      <DialogPrimitive.Close className="absolute right-3 top-3 grid size-11 place-items-center rounded-xl text-muted-foreground hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" aria-label="关闭弹窗"><X className="size-4" /></DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = 'DialogContent'
