import { RotateCw, Smartphone } from 'lucide-react'

export function OrientationNotice() {
  return <div className="orientation-notice" role="status">
    <div className="relative"><Smartphone className="size-16 -rotate-90 text-primary" /><RotateCw className="absolute -right-6 -top-5 size-7 text-primary/60" /></div>
    <h1 className="mt-8 text-2xl font-bold">请横屏游玩</h1>
    <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">把手机横过来，为小方块腾出一条路。<br />若画面未旋转，请关闭系统竖屏锁定。</p>
    <span className="mt-8 text-xs tracking-widest text-muted-foreground">SHUFFLE SEEK</span>
  </div>
}
