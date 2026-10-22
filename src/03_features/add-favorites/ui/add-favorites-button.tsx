import { Button } from '@/05_shared/ui/shadcn/button';
import { Bookmark } from 'lucide-react';
import { ComponentProps } from 'react';
import { FAVORITE_TYPE } from '../lib/const';
import { useFavorite } from '../model/use-favorite';

interface Props {
  size?: ComponentProps<typeof Button>['size'];
  id: string;
  favoriteType: FAVORITE_TYPE;
};

export function AddFavoritesButton({ size = 'xs', id, favoriteType }: Props) {
  const { isFavorite, mutate, isPending } = useFavorite(favoriteType, id);

  return (
    <Button
      disabled={isPending}
      size={size}
      onClick={() => mutate()}
      variant="ghost"
      className="hover:bg-transparent"
      aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
    >
      <Bookmark
        fill={isFavorite
          ? 'white'
          : 'transparent'}
        className="w-7 h-7 text-white/90"
      />
    </Button>
  );
}
