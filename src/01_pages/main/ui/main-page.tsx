import { MainNav } from '@/02_widgets/main-nav';
import { NewsList } from '@/02_widgets/news-list';
import { getNewsFeed } from '@/app/actions/news-feed';

export async function MainPage() {
  const { news, hasMore } = await getNewsFeed(1);

  return (
    <div className="relative flex flex-col max-w-5xl mx-auto px-4 antialiased">
      <MainNav />

      <div className="pt-32 md:pt-48 lg:pt-36 mb-12 space-y-4">
        <NewsList initialNews={news} initialHasMore={hasMore} />
      </div>
    </div>
  );
}
