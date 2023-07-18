import type { Author } from '../../utils/types';

export interface IAuthGateway {
  signIn: (email: string, password: string) => Promise<Author>;
  signUp: (email: string, password: string) => Promise<Author>;
  signOut: () => Promise<void>;
}
