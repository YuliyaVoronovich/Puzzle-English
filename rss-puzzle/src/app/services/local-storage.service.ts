import type { Hints, User } from '../interfaces/types';

const localStoragePrefix = 'yuliyavoronovich-JSFE2023Q4';

class LocalStorage {
  public setItem(key: string, value: unknown): void {
    localStorage.setItem(`${localStoragePrefix}_${key}`, JSON.stringify(value));
  }

  private static getItem(key: string): unknown {
    const data: string | null = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }

    return null;
  }

  public getUser(key: string): User | null {
    const user = LocalStorage.getItem(`${localStoragePrefix}_${key}`);

    if (!user) {
      return null;
    }

    if (LocalStorage.isUser(user)) {
      return user;
    }

    throw new Error('unknown value stored with key user');
  }

  public getHints(key: string): boolean {
    const hints = localStorage.getItem(`${localStoragePrefix}_${key}`);
    return hints === 'true';
  }

  public checkUser(key: string): boolean {
    return !!LocalStorage.getItem(`${localStoragePrefix}_${key}`);
  }

  private static isUser(value: unknown): value is User {
    return Boolean(value) && typeof value === 'object';
  }

  private static isHints(value: unknown): value is Hints {
    return Boolean(value) && typeof value === 'object';
  }

  public deleteData(key: string): void {
    localStorage.removeItem(`${localStoragePrefix}_${key}`);
  }
}
export const LocalStorageService = new LocalStorage();
