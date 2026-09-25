import { UserNav } from '@/02_widgets/nav';
import { Authorization } from '@/03_features/authorization';
import { SetupCarUser } from '@/04_entities/setup';
import { UserInclude } from '@/04_entities/user';
import { getUser } from '@/04_entities/user/model/get-user';

export async function UserPage() {
  const userData = await getUser() as UserInclude;

  if (!userData) {
    return <Authorization />;
  }

  return (
    <div className="relative flex flex-col max-w-5xl mx-auto px-4 antialiased">
      <UserNav />

      <div className="pt-32 md:pt-48 lg:pt-36 mb-8 space-y-4">
        {userData?.setups.map(setup => (
          <SetupCarUser
            key={setup.id}
            setup={setup}
          />
        ))}
      </div>
    </div>
  );
};
