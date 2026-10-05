import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CARDS_PER_PAGE } from '../lib/const';

export function useInfiniteScroll(listLength: number) {
  const [currentLength, setCurrentLength] = useState(CARDS_PER_PAGE);
  const [hasMore, setHasMore] = useState(listLength > CARDS_PER_PAGE);

  const { ref } = useInView({
    threshold: 0,
    rootMargin: '400px',
    onChange: (inView) => {
      if (inView && currentLength < listLength) {
        setHasMore(listLength > currentLength + CARDS_PER_PAGE);
        setCurrentLength(current => current + CARDS_PER_PAGE);
      }
    },
  });

  return { currentLength, hasMore, scrollRef: ref };
}
