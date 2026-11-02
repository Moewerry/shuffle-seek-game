import { Hand } from 'lucide-react'

export function TutorialGesture() {
  return <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <span className="size-16 animate-ping rounded-full border-2 border-violet-400 motion-reduce:animate-none" />
    <Hand className="tutorial-hand absolute left-[55%] top-[55%] !size-9 fill-violet-100 text-violet-600" />
  </span>
}
