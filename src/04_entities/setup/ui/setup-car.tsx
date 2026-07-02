import dayjs from 'dayjs';
import Link from 'next/link';

import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { setupDetailRoute } from '@/05_shared/lib/next/routes';
import { Badge } from '@/05_shared/ui/shadcn/badge';

interface Props {
  lapTime: LapTimeCarInclude;
};

export function SetupCar({ lapTime }: Props) {
  return (
    <Link
      key={lapTime.id}
      href={setupDetailRoute(lapTime.setup.id)}
      target="_blank"
      className="flex flex-col rounded-xl border border-white/5 bg-slate-900/20 backdrop-blur-sm hover:bg-slate-900/40 transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="h-full w-fit py-6 px-8 flex flex-col md:grid md:grid-cols-5 items-center gap-8">
        <div className="w-full col-span-2 flex flex-col items-start gap-1">
          <h3 className="flex items-center font-bold text-secondary text-lg">
            {lapTime.setup.title}
          </h3>

          <p className="flex flex-col gap-6 text-xs text-slate-400">
            <span>
              {'Author: '}
              {lapTime.setup.author.username}
            </span>

            <span className="flex items-center text-sm">
              {lapTime.setup.car.manufacturer}
              {' '}
              {lapTime.setup.car.name}
              {` • `}
              {lapTime.setup.car.year}
              {` • `}
              {lapTime.setup.power}
            &nbsp;
              {'BHP • '}
              {lapTime.setup.weight}
            &nbsp;
              {'kg • '}
              {lapTime.setup.weightBalanceFront}
              :
              {lapTime.setup.weightBalanceRear}
            </span>
          </p>
        </div>

        <div className="col-span-2 items-stretch flex md:flex-row-reverse flex-wrap gap-3">
          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.class !== 'ROAD' && `${CAR_CLASS[lapTime.setup.car.class]} / `}
            {'PP '}
            {lapTime.setup.pp.toFixed(2)}
          </Badge>

          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.drivetrain}
          </Badge>

          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.aspiration.replace('_', ' + ')}
          </Badge>

          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.engineLayout}
            -ENGINE
          </Badge>

          {
            lapTime.setup.car.isHybrid
            && (
              <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
                HYBRID
              </Badge>
            )
          }

          {
            lapTime.setup.car.overtake !== 'NONE' && (
              <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
                {lapTime.setup.car.overtake.replace('_', ' ')}
              </Badge>
            )
          }
        </div>

        <div className="col-span-1 flex flex-col justify-center h-full  w-full md:text-right">
          <p className="right-0 text-xl font-mono text-emerald-400 font-semibold">
            {dayjs().startOf('day').millisecond(lapTime.lapTime).format(`m'ss.SSS`)}
          </p>

          <p className="text-xs text-slate-500">
            {lapTime.author.username}
            {' • '}
            {dayjs(lapTime.createdAt).fromNow()}
          </p>
        </div>
      </div>
    </Link>
  );
};
