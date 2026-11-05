import { HelpCircle, Star } from 'lucide-react'
import { Paper } from '../ui/paper'

export function HomeArtwork() {
  return <div className="home-artwork" aria-hidden="true">
    <Paper stock="kraft" edge="deckle" tilt={-9} className="home-art-backing" seed="home-backing" />
    <Paper stock="paper" rules="graph" edge="torn" tape="top" tilt={5} className="home-art-sheet" seed="home-grid">
      <div className="grid size-full grid-cols-2 gap-4 p-7">
        {[false, true, false, false].map((target, index) => <Paper key={index} stock={target ? 'sticky-yellow' : 'card'} edge="deckle" tilt={index % 2 ? -4 : 3} className="grid aspect-square place-items-center" seed={`home-box-${index}`}>
          {target ? <Star className="size-8 fill-hi text-ink" strokeWidth={1.6} /> : <HelpCircle className="size-7 text-pencil" strokeWidth={1.4} />}
        </Paper>)}
      </div>
    </Paper>
    <span className="home-art-caption font-script">keep your eyes on the star!</span>
  </div>
}
