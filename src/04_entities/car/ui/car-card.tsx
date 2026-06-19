import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/05_shared/ui/shadcn/card';
import { CarInclude } from '../lib/types';

interface Props {
  car: CarInclude;
}

export function CarCard({ car }: Props) {
  return (
    <Card className="relative overflow-hidden min-h-52 h-full bg-background/30 backdrop-blur-xl border-white/10 shadow-lg transition-all hover:bg-background/40 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/40">
      <div className="absolute -inset-0.5 bg-linear-to-br from-white/20 to-transparent opacity-0 transition-opacity hover:opacity-100 pointer-events-none rounded-xl" />

      <div className="flex flex-col gap-8 justify-between h-full">
        <CardHeader className="flex justify-between gap-4 tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 bg-clip-text text-transparent">
          <CardTitle className="text-2xl font-bold">
            <p>
              {car.manufacturer}
              {' • '}
              {car.name}
            </p>
          </CardTitle>

          <p className="text-2xl font-light">
            {car.year}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-2">
          <p className="text-xs text-slate-400">
            {car.setups[0].power}
            {' BHP • '}
            {car.setups[0].weight}
            {' kg • '}
            {car.setups[0].weightBalanceFront}
            :
            {car.setups[0].weightBalanceRear}
          </p>

          <div className="flex gap-2 items-stretch">
            <Badge variant="outline" className="grow h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.class !== 'ROAD' && `${CAR_CLASS[car.class]} / `}
              {'PP '}
              {car.setups[0].pp.toFixed(2)}
            </Badge>

            <Badge variant="outline" className="grow h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.aspiration.replace('_', ' + ')}
            </Badge>

            <Badge variant="outline" className="grow h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.engineLayout}
              -ENGINE
            </Badge>

            <Badge variant="outline" className="grow h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.drivetrain}
            </Badge>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
