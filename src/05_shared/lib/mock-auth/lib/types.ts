export interface Session {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;

    username?: string | null;

    psnId?: string | null;
    psnName?: string | null;
    psnUrl?: string | null;

    isPsnPublic: boolean;
  };
  expires: string;
}
