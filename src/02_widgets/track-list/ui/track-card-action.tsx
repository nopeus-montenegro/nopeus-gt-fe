import { AddFavoritesButton } from '@/03_features/add-favorites';
import { FAVORITE_TYPE } from '@/03_features/add-favorites/lib/const';
import { useSession } from '@/05_shared/lib/mock-auth/hooks/use-session';
import { Button } from '@/05_shared/ui/shadcn/button';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  id: string;
  onUnauthenticated: () => void;
}

export function TrackCardAction({ id, onUnauthenticated }: Props) {
  const session = useSession();

  const handleUnauthClick = () => {
    toast.info('Authorization required!', {
      description: 'Please sign in to save favorite track.',
      action: {
        label: 'Sign In',
        onClick: onUnauthenticated,
      },
    });
  };

  if (session.status === 'authenticated') return <AddFavoritesButton size="icon-lg" id={id} favoriteType={FAVORITE_TYPE.TRACK} />;

  return (
    <Button
      size="icon-lg"
      onClick={handleUnauthClick}
      variant="ghost"
      className="hover:bg-transparent"
      aria-label="Sign In"
    >
      <Bookmark
        className="w-7 h-7 text-white/90"
      />
    </Button>
  );
}
