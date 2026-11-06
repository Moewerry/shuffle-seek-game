import { HelpCircle, Star } from 'lucide-react'
import { Paper } from '../ui/paper'

export function HomeArtwork() {
  return <div className="home-artwork" aria-hidden="true">
    <div className="home-art-stack">
      <Paper stock="card" rules="none" edge="cut" shadow="none" tape="top" tilt={2} className="home-art-sheet" seed="home-grid">
        <div className="grid size-full grid-cols-2 gap-[8%] p-[10%]">
          {[false, true, false, false].map((target, index) => <Paper key={index} stock="graph" rules="none" edge="deckle" shadow="none" tilt={index % 2 ? -4 : 3} className="home-art-tile grid aspect-square place-items-center" seed={`home-box-${index}`}>
            {target ? <Star className="size-8 fill-[#f8dc4c] text-ink" strokeWidth={1.6} /> : <HelpCircle className="size-7 text-pencil" strokeWidth={1.4} />}
          </Paper>)}
        </div>
      </Paper>
    </div>
    <span className="home-art-caption font-script">keep your eyes on the star!</span>
  </div>
}

