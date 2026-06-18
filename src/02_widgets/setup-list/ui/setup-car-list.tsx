import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { LapTimeInclude, SetupCar } from '@/04_entities/setup';
import { Wrench } from 'lucide-react';

dayjs.extend(relativeTime);

interface Props {
  lapTimeList: LapTimeInclude[];
}

export function SetupCarList({ lapTimeList }: Props) {
  return (
    <div className="relative z-10 container mx-auto px-4 max-w-5xl mt-6 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5 text-slate-400" />
        <h2 className="text-xl font-semibold tracking-tight text-white">Setups:</h2>
      </div>

      <div className="space-y-4">
        {lapTimeList.map(lapTime => (
          <SetupCar key={lapTime.id} lapTime={lapTime} />
        ))}
      </div>
    </div>
  );
}
