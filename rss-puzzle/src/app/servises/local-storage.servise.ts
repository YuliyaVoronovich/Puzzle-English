import { keyUser } from '../data/local-storage-keys';

class LocalStorage {
  public getUser(): unknown {
    const item = localStorage.getItem(keyUser);
    if (item) {
      const res: unknown = JSON.parse(item);
      return res;
    }
    return null;
  }

  public setUser(nameUser: string, surnameUser: string): void {
    const currentUser = { name: nameUser, surname: surnameUser };
    localStorage.setItem(keyUser, JSON.stringify(currentUser));
  }

  public isUser(): boolean {
    return !!localStorage.getItem(keyUser);
  }

  public deleteUser(): void {
    localStorage.removeItem(keyUser);
  }
}
export const LocalStorageServise = new LocalStorage();
