import { getFavoriteCars } from '@/03_features/add-favorites/model/get-favorite-cars';
import { toggleFavoriteCar } from '@/03_features/add-favorites/model/toggle-favorite-car';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function useFavoriteCarToggle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ carId, isFavorite }: { carId: string; isFavorite: boolean }) =>
      toggleFavoriteCar(carId, isFavorite),

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
    queryFn: () => getFavoriteCars(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useIsCarFavorite(carId: string) {
  const { data: isFavorited = false, isLoading } = useQuery({
    queryKey: ['cars', 'user-favorite'],
    queryFn: () => getFavoriteCars(),
    select: favIds => favIds.includes(carId),
  });

  return { isFavorited, isLoading };
}
