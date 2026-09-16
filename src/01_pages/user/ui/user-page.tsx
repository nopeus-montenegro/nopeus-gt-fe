import { FaDiscord } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { UserNav } from '@/02_widgets/nav';
import { Session } from '@/05_shared/lib/mock-auth/lib/types';
import { Button } from '@/05_shared/ui/shadcn/button';
import { Field, FieldLabel } from '@/05_shared/ui/shadcn/field';
import { Input } from '@/05_shared/ui/shadcn/input';

interface Props {
  session: Session | null;
};

export function UserPage({ session }: Props) {
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-dvh max-w-xs m-auto">
        {/* <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={field.name}>Name</FieldLabel>
            <Input {...field} id={field.name} aria-invalid={fieldState.invalid} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field> */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input id="email" className="py-5" />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" className="py-5" />
        </Field>

        <Button variant="secondary" className="w-full mt-5 py-5">
          Sign in
        </Button>

        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-600 to-transparent my-4" />

        <Button variant="secondary" className="w-full py-5 bg-[#5865f2] text-white hover:bg-[#5865f2]">
          <FaDiscord className="w-6 h-6 mr-1" />
          Sign in with Discord
        </Button>

        <Button variant="secondary" className="w-full py-5">
          <FcGoogle className="w-6 h-6 mr-1" />
          Sign in with Google
        </Button>

        <div className="h-px w-full bg-linear-to-r from-transparent via-zinc-600 to-transparent mt-6 mb-4" />

        <Field>
          <FieldLabel htmlFor="password">Don&#39;t have an account yet?</FieldLabel>
          <Button variant="outline" className="w-full py-5">
            Sign Up
          </Button>
        </Field>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col max-w-5xl mx-auto px-4 antialiased">
      <UserNav />

      <div className="pt-32 md:pt-48 lg:pt-36 mb-8 space-y-4">
        User Dashboard
      </div>
    </div>
  );
};
