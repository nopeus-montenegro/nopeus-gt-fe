import Link from 'next/link';

import { CAR_CLASS } from '@/05_shared/lib/dictionaries';
import { setupDetailRoute } from '@/05_shared/lib/next/routes';
import { cn } from '@/05_shared/lib/shadcn/utils';
import { Badge } from '@/05_shared/ui/shadcn/badge';
import { slugify } from '@/05_shared/utils/slugify';
import { SetupUserInclude } from '../lib/types';
import { getSetupAspiration } from '../lib/utils/get-setup-aspiration';

interface Props {
  setup: SetupUserInclude;
};

export function SetupCarUser({ setup }: Props) {
  return (
    <div
      key={setup.id}
      className={cn(
        'relative flex flex-col md:grid md:grid-cols-5 items-center gap-8',
        'py-6 px-6 md:px-8',
        'rounded-xl border border-white/5',
        'bg-slate-900/20 backdrop-blur-sm',
        'hover:bg-slate-900/40 hover:-translate-y-0.5 hover:shadow-lg transition-all',
      )}
    >
      <div className="w-full col-span-3 flex flex-col items-start gap-1">
        <h3 className="flex items-center font-bold text-secondary text-lg">
          <Link
            href={setupDetailRoute(slugify([setup.car.manufacturer, setup.car.name, setup.car.year.toString(), 'setup', setup.id]))}
            target="_blank"
            rel="noreferrer noopener"
            className="after:absolute after:inset-0"
          >
            {setup.title}
          </Link>
        </h3>

        <p className="flex items-center text-sm text-slate-400">
          {setup.car.manufacturer}
          {' '}
          {setup.car.name}
          {` • `}
          {setup.car.year}
          {` • `}
          {setup.power}
            &nbsp;
          {'BHP • '}
          {setup.weight}
            &nbsp;
          {'kg • '}
          {setup.weightBalanceFront}
          :
          {setup.weightBalanceRear}
        </p>
      </div>

      <div className="w-full col-span-2 items-start md:items-stretch flex md:flex-row-reverse flex-wrap gap-3">
        <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {setup.car.class !== 'ROAD' && `${CAR_CLASS[setup.car.class]} / `}
          {'PP '}
          {setup.pp.toFixed(2)}
        </Badge>

        <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {setup.car.drivetrain}
        </Badge>

        <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {setup.car.aspiration === 'EV' ? 'EV' : getSetupAspiration(setup)}
        </Badge>

        <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
          {setup.car.engineLayout}
          -ENGINE
        </Badge>

        {
          setup.car.isHybrid
          && (
            <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
              HYBRID
            </Badge>
          )
        }

        {
          setup.car.overtake !== 'NONE' && (
            <Badge variant="outline" className="h-8 px-4 py-2 border border-secondary/30 bg-secondary/10 text-secondary">
              {setup.car.overtake.replace('_', ' ')}
            </Badge>
          )
        }
      </div>
    </div>
  );
};
