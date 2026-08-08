import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/05_shared/ui/shadcn/card';
import { slugify } from '@/05_shared/utils/slugify';
import Image from 'next/image';
import { CarInclude } from '../lib/types';

interface Props {
  car: CarInclude;
  priority?: boolean;
}

export function CarCard({ car, priority }: Props) {
  return (
    <Card className="relative grid grid-rows-subgrid row-span-3 overflow-hidden min-h-52 h-full bg-slate-900/20 backdrop-blur-xl border border-white/5 shadow-lg transition-all hover:bg-slate-900/60 hover:-translate-y-1 hover:shadow-xl dark:bg-slate-900/20">
      <div className="absolute -inset-0.5 bg-linear-to-br from-white/20 to-transparent opacity-0 transition-opacity hover:opacity-100 pointer-events-none rounded-xl" />

      <div className="grid grid-rows-subgrid row-span-3 gap-y-8 h-full px-4">
        <CardHeader className="flex justify-between gap-4 p-0 tracking-tight bg-linear-to-br from-secondary/60 via-white/50 to-secondary/40 bg-clip-text text-transparent">
          <CardTitle className="text-2xl font-bold">
            {car.manufacturer}
            {' • '}
            {car.name}
          </CardTitle>

          <p className="text-2xl font-light">
            {car.year}
          </p>
        </CardHeader>

        <Image
          className="w-full rounded-sm object-contain"
          src={`${process.env.NEXT_PUBLIC_BLOB_URL}/cars/${slugify([car.manufacturer, car.name, car.year.toString()])}.webp`}
          alt={`${car.manufacturer} ${car.name} ${car.year}`}
          width={1200}
          height={750}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 640px"
          priority={priority}
        />

        <CardContent className="flex flex-col gap-2 p-0">
          <p className="text-xs text-slate-400">
            {car.setups[0].power}
            {' BHP • '}
            {car.setups[0].weight}
            {' kg • '}
            {car.setups[0].weightBalanceFront}
            :
            {car.setups[0].weightBalanceRear}
          </p>

          <div className="flex flex-wrap gap-2 items-stretch">
            <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.class !== 'ROAD' && `${CAR_CLASS[car.class]} / `}
              {'PP '}
              {car.setups[0].pp.toFixed(2)}
            </Badge>

            <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.aspiration.replace('_', ' + ')}
            </Badge>

            <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.engineLayout}
              -ENGINE
            </Badge>

            <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {car.drivetrain}
            </Badge>

            {
              car.isHybrid
              && (
                <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
                  HYBRID
                </Badge>
              )
            }

            {
              car.overtake !== 'NONE' && (
                <Badge variant="outline" className="h-6 p-2 border border-secondary/30 bg-secondary/10 text-secondary">
                  {car.overtake.replace('_', ' ')}
                </Badge>
              )
            }
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
