import { UserPage } from '@/01_pages/user';
import { auth } from '@/05_shared/lib/mock-auth/auth';

export default async function UserAppPage() {
  const session = await auth();

  return (
    <UserPage session={session} />
  );
}
