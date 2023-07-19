import { genSaltSync, hashSync, compareSync } from 'bcryptjs';

import type { IAuthGateway } from './Auth.gateway.interface';
import type { Author, User } from '../../utils/types';

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
    const storagedUsers = this.getStorage<User[]>();

    const foundUser = storagedUsers?.find((user) => user.login === email);
    if (!foundUser) throw new Error('Invalid credentials');

    const isPasswordValid = compareSync(password, foundUser.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    return createNewAuthor(email);
  }

  async signUp(email: string, password: string): Promise<Author> {
    const salt = genSaltSync(Math.floor(Math.random() * 10) + 5);
    const hashedPassword = hashSync(password, salt);

    const storagedUsers = this.getStorage<User[]>();

    if (storagedUsers) {
      this.setStorage([
        ...storagedUsers,
        { login: email, password: hashedPassword },
      ]);

      return createNewAuthor(email);
    }

    this.setStorage([{ login: email, password: hashedPassword }]);
    return createNewAuthor(email);
  }

  async signOut(): Promise<void> {
    this.resetStorage();
  }
}
