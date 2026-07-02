'use client';

import { LapTimeCarInclude } from '@/04_entities/lap-time';
import { SetupCar } from '@/04_entities/setup';
import { ResolvedPageSearchParams } from '@/05_shared/lib/types';
import { SetupList } from './setup-list';

interface Props {
  lapTimeList: LapTimeCarInclude[];
  id: string;
  searchParams: ResolvedPageSearchParams;
  fetch: (id: string, nextPage: number, currentSearchParams: ResolvedPageSearchParams) => Promise<LapTimeCarInclude[]>;
}

export function SetupCarList({ lapTimeList, id, searchParams, fetch }: Props) {
  return (
    <SetupList
      lapTimeList={lapTimeList}
      id={id}
      searchParams={searchParams}
      fetch={fetch}
    >
      {item => <SetupCar lapTime={item} />}
    </SetupList>
  );
}
