import { Button } from '@/05_shared/ui/shadcn/button';
import { ComponentProps, ReactNode } from 'react';
import { useFavoriteCarToggle } from '../model/use-favorite-car';

interface Props {
  size?: ComponentProps<typeof Button>['size'];
  buttonIcon: ReactNode;
  id: string;
  isFavorite: boolean;
};

export function AddFavoritesButton({ size = 'xs', buttonIcon, id, isFavorite }: Props) {
  const { mutate, isPending } = useFavoriteCarToggle();

  return (
    <Button
      disabled={isPending}
      size={size}
      onClick={() => mutate({ carId: id, isFavorite })}
      variant="ghost"
      className="hover:bg-transparent"
      aria-label={isFavorite ? 'Remove favorite' : 'Add favorite'}
    >
      {buttonIcon}
    </Button>
  );
}
