import { cn } from '@/05_shared/lib/shadcn/utils';
import { ChevronDown, ChevronsUp, ChevronUp, LucideProps, Route } from 'lucide-react';

import { TrackClass } from '@prisma/client';

export const TRACK_CLASS_ICONS: Record<TrackClass, React.FC<LucideProps>> = {
  SPEED: props => <ChevronsUp {...props} className={cn('text-green-400/80', props.className)} />,
  HYBRID: props => <ChevronUp {...props} className={cn('text-blue-400/80', props.className)} />,
  TECHNICAL: props => <ChevronDown {...props} className={cn('text-red-400/80', props.className)} />,
  RALLY: props => <Route {...props} className={cn('text-amber-400/80', props.className)} />,
};
