import { toggleFavorite } from '@/03_features/add-favorites/model/toggle-favorite';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FAVORITE_TYPE } from '../lib/const';
import { getFavorite } from './get-favorite';

export function useFavoriteCarToggle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ carId, isFavorite }: { carId: string; isFavorite: boolean }) =>
      toggleFavorite(carId, isFavorite, FAVORITE_TYPE.CAR),

    onMutate: async ({ carId, isFavorite }) => {
      await queryClient.cancelQueries({ queryKey: ['cars', 'user-favorite'] });

      const previousFavorites = queryClient.getQueryData<string[]>(['cars', 'user-favorite']);

      queryClient.setQueryData<string[]>(['cars', 'user-favorite'], (old = []) => {
        if (isFavorite) {
          return old.filter(id => id !== carId);
        } else {
          return [...old, carId];
        }
      });

      return { previousFavorites };
    },

    onError: (_err, _newTodo, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(['cars', 'user-favorite'], context.previousFavorites);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['cars', 'user-favorite'] });
    },
  });
}

export function useFavoriteCarList() {
  return useQuery({
    queryKey: ['cars', 'user-favorite'],
    queryFn: () => getFavorite(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useIsCarFavorite(carId: string) {
  const { data: isFavorited = false, isLoading } = useQuery({
    queryKey: ['cars', 'user-favorite'],
    queryFn: () => getFavorite(),
    select: fav => fav.favCars.includes(carId),
  });

  return { isFavorited, isLoading };
}
