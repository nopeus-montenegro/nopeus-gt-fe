import { CAR_FILTER, TRACK_FILTER } from '@/05_shared/lib/const';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Button } from '@/05_shared/ui/shadcn/button';
import { ButtonGroup, ButtonGroupText } from '@/05_shared/ui/shadcn/button-group';
import { BopTrackClass, CarClass } from '@prisma/client';
import Link from 'next/link';

export function MainNav() {
  return (
    <header className="fixed top-0 md:top-8 left-0 right-0 z-50 flex justify-center px-0 md:px-8 pointer-events-none">
      <nav
        className={cn(
          'w-full max-w-5xl pointer-events-auto',
          'flex items-center justify-start md:justify-between gap-4',
          'px-6 py-6 shadow-xl shadow-black/40',
          'rounded-b-2xl md:rounded-2xl',
          'border border-secondary/5 bg-secondary/30 backdrop-blur-sm',
        )}
      >
        <h1 className="text-2xl text-center font-black tracking-tighter uppercase italic">
          Nopeus&nbsp;
          <span className="text-blue-500 not-italic">GT</span>
        </h1>

        <div className="flex flex-col lg:flex-row gap-2">
          <Button asChild variant="outline">
            <Link href="/car">CARS</Link>
          </Button>

          <ButtonGroup className="hidden md:flex">
            {[
              { label: 'Gr.1', value: CarClass.GR_1 },
              { label: 'Gr.2', value: CarClass.GR_2 },
              { label: 'Gr.3', value: CarClass.GR_3 },
              { label: 'Gr.4', value: CarClass.GR_4 },
              { label: 'Gr.B', value: CarClass.GR_B },
            ].map(item => (
              <Button key={item.label} asChild variant="outline">
                <Link
                  href={`/car?${CAR_FILTER.CAR_CLASS}=${item.value}`}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold border border-slate-400/80 text-slate-400 hover:text-white hover:bg-indigo-950/30 transition-all duration-200 shadow-sm"
                >
                  {item.label}
                </Link>
              </Button>

            ))}
          </ButtonGroup>
        </div>

        <div className="flex flex-col lg:flex-row gap-2">
          <Button asChild variant="outline">
            <Link href="/track">TRACKS</Link>
          </Button>

          <ButtonGroup className="hidden md:flex">
            {[
              { label: 'BoP: High-Speed', value: BopTrackClass.HIGH_SPEED },
              { label: 'BoP: Mid-Speed', value: BopTrackClass.MID_SPEED },
              { label: 'BoP: Low-Speed', value: BopTrackClass.LOW_SPEED },
            ].map(item => (
              <ButtonGroupText
                key={item.label}
                asChild
                className="rounded-full border border-accent/30 bg-accent/10 hover:text-accent text-accent/80 hover:bg-accent/20 transition-all duration-200 shadow-sm"
              >
                <Link
                  href={`/track?${TRACK_FILTER.BOP}=${item.value}`}
                  className="flex items-center px-3 py-1.5 text-xs font-semibold text-nowrap"
                >
                  {item.label}
                </Link>
              </ButtonGroupText>
            ))}
          </ButtonGroup>
        </div>

        {/* <div>
          <h1 className={cn(
            'font-bold tracking-tight bg-linear-to-br from-white to-white/40 bg-clip-text text-transparent',
            'text-xl md:text-2xl',
          )}
          >
            {car.manufacturer}
            {' '}
            {car.name}
            {' • '}
            {car.year}
          </h1>

          <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
            {car.setups[0].power}
                  &nbsp;
            {'BHP • '}
            {car.setups[0].weight}
                  &nbsp;
            {'kg • '}
            {car.setups[0].weightBalanceFront}
            :
            {car.setups[0].weightBalanceRear}
          </p>
        </div>

        <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
          {
            car.isHybrid
            && (
              <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                HYBRID
              </Badge>
            )
          }

          {
            car.overtake !== 'NONE' && (
              <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
                {car.overtake.replace('_', ' ')}
              </Badge>
            )
          }

          <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
            {car.engineLayout}
            -ENGINE
          </Badge>

          <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
            {car.aspiration.replace('_', ' + ')}
          </Badge>

          <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
            {car.drivetrain}
          </Badge>

          <Badge variant="outline" className="h-8 p-4 border border-secondary/30 bg-secondary/10 text-secondary">
            {car.class !== 'ROAD' && `${CAR_CLASS[car.class]} / `}
            {'PP '}
            {car.setups[0].pp.toFixed(2)}
          </Badge>
        </div> */}
      </nav>
    </header>
  );
}
