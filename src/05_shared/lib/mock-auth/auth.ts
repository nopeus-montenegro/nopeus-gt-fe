import { MOCK_USER } from './lib/const';
import { Session } from './lib/types';

const MOCK_SESSION: Session = {
  user: MOCK_USER,
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
};

const IS_DEV_AUTH = true;

export async function auth(): Promise<Session | null> {
  if (!IS_DEV_AUTH) return null;
  return MOCK_SESSION;
}
