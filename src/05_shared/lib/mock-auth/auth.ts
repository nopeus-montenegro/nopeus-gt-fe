import { MOCK_USER } from './lib/const';
import { Session } from './lib/types';

export async function auth(): Promise<Session | null> {
  const IS_DEV_AUTH = true;

  if (!IS_DEV_AUTH) return null;
  return {
    user: MOCK_USER,
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  };
}
