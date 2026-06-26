import { SetupPage } from '@/01_pages/setup';

interface Params {
  params: Promise<{
    setupId: string;
  }>;
}

export default async function SetupAppPage({ params }: Params) {
  const { setupId } = await params;

  return (
    <SetupPage setupId={setupId} />
  );
}
