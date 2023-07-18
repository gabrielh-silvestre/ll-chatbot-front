import type { IAuthGateway } from './Auth.gateway.interface';
import type { Author } from '../../utils/types';

import { createNewAuthor } from '../../utils/helpers';

export class AuthLocalStorageGateway implements IAuthGateway {
  private readonly storageKey = 'user:auth';

  private getStorage<T = any>(): T | null {
    const value = localStorage.getItem(this.storageKey);
    return value ? (JSON.parse(value) as T) : null;
  }

  private setStorage(value: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(value));
  }

  private resetStorage(): void {
    localStorage.removeItem(this.storageKey);
  }

  async signIn(email: string, password: string): Promise<Author> {
    const base64 = btoa(`${email}:${password}`);
    const storagedUser = this.getStorage<string>();

    if (storagedUser !== base64) throw new Error('Invalid credentials');

    return createNewAuthor(email);
  }

  async signUp(email: string, password: string): Promise<Author> {
    const base64 = btoa(`${email}:${password}`);

    this.setStorage(base64);

    return createNewAuthor(email);
  }

  async signOut(): Promise<void> {
    this.resetStorage();
  }
}
