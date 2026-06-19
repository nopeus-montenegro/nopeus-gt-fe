import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { LapTimeCarInclude, LapTimeTrackInclude } from '@/04_entities/lap-time';
import { Wrench } from 'lucide-react';

dayjs.extend(relativeTime);

interface Props<T extends LapTimeCarInclude | LapTimeTrackInclude> {
  lapTimeList: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function SetupList<T extends LapTimeCarInclude | LapTimeTrackInclude>({ lapTimeList, renderItem }: Props<T>) {
  return (
    <div className="relative z-10 container mx-auto px-4 max-w-5xl mt-6 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <Wrench className="w-5 h-5 text-slate-400" />
        <h2 className="text-xl font-semibold tracking-tight text-white">Setups:</h2>
      </div>

      <div className="space-y-4">
        {
          lapTimeList.map(lapTime => (
            renderItem(lapTime)
          ))
        }
      </div>
    </div>
  );
}
