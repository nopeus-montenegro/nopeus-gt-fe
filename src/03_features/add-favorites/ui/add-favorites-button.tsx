import { Button } from '@/05_shared/ui/shadcn/button';
import { Bookmark } from 'lucide-react';
import { ComponentProps } from 'react';
import { useFavoriteCarList, useFavoriteCarToggle } from '../model/use-favorite-car';

interface Props {
  size?: ComponentProps<typeof Button>['size'];
  id: string;
};

export function AddFavoritesButton({ size = 'xs', id }: Props) {
  const { mutate, isPending } = useFavoriteCarToggle();
  const { data = [] } = useFavoriteCarList();
  const isFavorite = data.includes(id);

  return (
    <Button
      disabled={isPending}
      size={size}
      onClick={() => mutate({ carId: id, isFavorite })}
      variant="ghost"
      className="hover:bg-transparent"
      aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
    >
      <Bookmark
        fill={isFavorite
          ? 'white'
          : 'transparent'}
        className="w-5 h-5 text-white/90"
      />
    </Button>
  );
}
