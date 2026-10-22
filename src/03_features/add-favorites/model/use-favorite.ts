import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FAVORITE_TYPE } from '../lib/const';
import { Favorites } from '../lib/types';
import { getFavorite } from './get-favorite';
import { toggleFavorite } from './toggle-favorite';

export function useFavorite(favoriteType: FAVORITE_TYPE, id: string) {
  const queryClient = useQueryClient();

  const { data: favorites = {
    favCars: [],
    favTracks: [],
    favSetups: [],
  } } = useQuery<Favorites>({
    queryKey: ['user-favorites'],
    queryFn: () => getFavorite(),
    staleTime: 5 * 60 * 1000,
  });

  const favoritesList = favorites[favoriteType] || [];
  const isFavorite = favoritesList.includes(id);

  const { mutate, isPending } = useMutation({
    mutationFn: () => toggleFavorite(id, isFavorite, favoriteType),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user-favorites'] });

      const previousFavorites = queryClient.getQueryData<Favorites>(['user-favorites']);

      queryClient.setQueryData<Favorites>(['user-favorites'], (old) => {
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
        queryClient.setQueryData(['user-favorites'], context.previousFavorites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user-favorites'] });
    },
  });

  return { favoritesList, isFavorite, mutate, isPending };
}
