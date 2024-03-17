import type { Hints, User } from '../types/types';

const LocalStoragePrefix = 'yuliyavoronovich-JSFE2023Q4';

class LocalStorage {
  public setItem(key: string, value: unknown): void {
    localStorage.setItem(`${LocalStoragePrefix}_${key}`, JSON.stringify(value));
  }

  private static getItem(key: string): unknown {
    const data: string | null = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }

    return null;
  }

  public getUser(key: string): User | null {
    const user = LocalStorage.getItem(`${LocalStoragePrefix}_${key}`);

    if (!user) {
      return null;
    }

    if (LocalStorage.isUser(user)) {
      return user;
    }

    throw new Error('unknown value stored with key user');
  }

  public getHints(key: string): boolean {
    const hints = localStorage.getItem(`${LocalStoragePrefix}_${key}`);
    return hints === 'true';
  }

  public checkUser(key: string): boolean {
    return !!LocalStorage.getItem(`${LocalStoragePrefix}_${key}`);
  }

  private static isUser(value: unknown): value is User {
    return Boolean(value) && typeof value === 'object';
  }

  private static isHints(value: unknown): value is Hints {
    return Boolean(value) && typeof value === 'object';
  }

  public deleteData(key: string): void {
    localStorage.removeItem(`${LocalStoragePrefix}_${key}`);
  }
}
export const LocalStorageServise = new LocalStorage();
