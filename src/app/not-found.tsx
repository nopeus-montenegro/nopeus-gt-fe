import { ButtonBack } from '@/05_shared/ui/buttons';
import { Button } from '@/05_shared/ui/shadcn/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Garage 404 - Route Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-8 h-screen items-center justify-center text-center text-white">
      <div className="grid grid-cols-2 gap-y-8">
        <h1 className="flex flex-row align-middle border-r pr-6 text-3xl font-bold leading-12 border-white/30">
          <span className="text-sm font-normal mr-4 my-auto">Garage </span>
          404
        </h1>

        <h2 className="m-0 pl-8 text-sm font-normal text-start leading-12">
          Wrong lane
        </h2>

        <ButtonBack />

        <Button className="ml-6 mr-6" asChild variant="outline">
          <Link href="/">Main</Link>
        </Button>
      </div>
    </div>
  );
}
