import { AddFavoritesButton } from '@/03_features/add-favorites';
import { useSession } from '@/05_shared/lib/mock-auth/hooks/use-session';
import { Button } from '@/05_shared/ui/shadcn/button';
import { Bookmark } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  id: string;
  onUnauthenticated: () => void;
}

export function CarCardAction({ id, onUnauthenticated }: Props) {
  const session = useSession();

  const handleUnauthClick = () => {
    toast.info('Authorization required!', {
      description: 'Please sign in to save favorite car.',
      action: {
        label: 'Sign In',
        onClick: onUnauthenticated,
      },
    });
  };

  if (session.status === 'authenticated') return <AddFavoritesButton id={id} />;

  return (
    <Button
      size="xs"
      onClick={handleUnauthClick}
      variant="ghost"
      className="hover:bg-transparent"
      aria-label="Sign In"
    >
      <Bookmark
        className="w-5 h-5 text-white/90"
      />
    </Button>
  );
}
