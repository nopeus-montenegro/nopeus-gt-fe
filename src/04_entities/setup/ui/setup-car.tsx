import dayjs from 'dayjs';

import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { LapTimeInclude } from '../lib/types';

interface Props {
  lapTime: LapTimeInclude;
};

export function SetupCar({ lapTime }: Props) {
  return (
    <div
      key={lapTime.id}
      className="grid grid-cols-6 items-center gap-8 p-5 rounded-xl border border-white/5 bg-slate-900/20 backdrop-blur-sm hover:bg-slate-900/40 transition-colors"
    >
      <div className="col-span-2 flex items-center gap-4">
        <div>
          <h3 className="flex items-center gap-2 font-bold text-secondary">
            {lapTime.setup.car.manufacturer}
            {' '}
            {lapTime.setup.car.name}
            {` '`}
            {lapTime.setup.car.year.toString().slice(-2)}
          </h3>

          <p className="text-xs text-slate-400 mt-1">
            {lapTime.setup.power}
            {' BHP • '}
            {lapTime.setup.weight}
            {' kg • '}
            {lapTime.setup.weightBalanceFront}
            :
            {lapTime.setup.weightBalanceRear}
          </p>
        </div>
      </div>

      <div className="col-span-3 items-stretch flex flex-row-reverse flex-wrap gap-2">
        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.class !== 'ROAD' && `${CAR_CLASS[lapTime.setup.car.class]} / `}
            {'PP '}
            {lapTime.setup.pp.toFixed(2)}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.aspiration.replace('_', ' + ')}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.drivetrain}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
            {lapTime.setup.car.engineLayout}
            -ENGINE
          </Badge>
        </div>
      </div>

      <div className="col-span-1 text-right">
        <span className="text-sm font-mono text-emerald-400 font-semibold">{dayjs().startOf('day').millisecond(lapTime.lapTime).format(`m'ss.SSS`)}</span>

        <p className="text-[10px] text-slate-500 mt-1">
          {lapTime.setup.author.username}
          {' • '}
          {dayjs(lapTime.setup.createdAt).fromNow()}
        </p>
      </div>
    </div>

  );
};
