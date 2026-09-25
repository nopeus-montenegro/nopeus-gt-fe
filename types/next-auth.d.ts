import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      psnId?: string | null;
      psnName?: string | null;
      gtProfileId?: string | null;
      isPsnPublic: boolean;
    } & DefaultSession['user'];
  }
}
