'use client';

import { LapTimeTrackInclude } from '@/04_entities/lap-time';
import { SetupTrack } from '@/04_entities/setup';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { SetupList } from './setup-list';

interface Props {
  lapTimeList: LapTimeTrackInclude[];
  id: string;
  searchParams: ResolvedPageSearchParams;
  fetch: (id: string, nextPage: number, currentSearchParams: ResolvedPageSearchParams) => Promise<LapTimeTrackInclude[]>;
}

export function SetupTrackList({ lapTimeList, id, searchParams, fetch }: Props) {
  return (
    <SetupList
      lapTimeList={lapTimeList}
      id={id}
      searchParams={searchParams}
      fetch={fetch}
    >
      {item => <SetupTrack lapTime={item} />}
    </SetupList>
  );
}
