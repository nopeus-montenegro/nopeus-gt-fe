import { useSession } from '@/05_shared/lib/mock-auth/hooks/use-session';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FAVORITE_TYPE } from '../lib/const';
import { Favorites } from '../lib/types';
import { getFavorite } from './get-favorite';
import { toggleFavorite } from './toggle-favorite';

export function useFavorite(favoriteType: FAVORITE_TYPE, id: string) {
  const queryClient = useQueryClient();
  const session = useSession();
  const queryKey = ['user-favorites', session.data?.user.id];

  const { data: favorites = {
    favCars: [],
    favTracks: [],
    favSetups: [],
  } } = useQuery<Favorites>({
    queryKey: queryKey,
    queryFn: () => getFavorite(),
    staleTime: 5 * 60 * 1000,
  });

  const favoritesList = favorites[favoriteType] || [];
  const isFavorite = favoritesList.includes(id);

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleFavorite(id, isFavorite, favoriteType),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryKey });

      const previousFavorites = queryClient.getQueryData<Favorites>(queryKey);

      queryClient.setQueryData<Favorites>(queryKey, (old) => {
        if (!old) return old;

        const oldList = old[favoriteType] || [];
        const newList = !isFavorite
          ? [...oldList, id]
          : oldList.filter(itemId => itemId !== id);

        return {
          ...old,
          [favoriteType]: newList,
        };
      });

      return { previousFavorites };
    },

    onError: (_err, _vars, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(queryKey, context.previousFavorites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey });
    },
  });

  return { favoritesList, isFavorite, mutate, isPending };
}
