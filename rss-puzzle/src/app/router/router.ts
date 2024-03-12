import type BaseComponent from '../components/base-component';
import type Page from '../pages/page';
import { LocalStorageServise } from '../services/local-storage.service';

export default class Router {
  constructor(private routerOutlet: Page) {
    this.handleLocation();
    window.onpopstate = (): void => {
      this.handleLocation();
    };
  }

  public handleLocation(): void {
    const isUser: boolean = LocalStorageServise.checkUser('user');
    const arrayPath = window.location.pathname.split('/');
    const pathname = arrayPath[arrayPath.length - 1];

    let currentPath;
    if (!isUser) {
      currentPath = '/';
    } else if (!pathname) {
      currentPath = '/welcome';
    } else {
      currentPath = `/${pathname}`;
    }
    window.history.pushState({}, '', pathname);

    this.setViewContent(currentPath)
      .then((data) => {
        this.routerOutlet.setContent(data);
      })
      .catch(() => {});
  }

  private setViewContent = async (location: string): Promise<BaseComponent> => {
    switch (location) {
      case '/welcome': {
        const { default: Start } = await import('../pages/start/start-page');
        return new Start();
      }
      case '/game': {
        const { default: Game } = await import('../pages/game/game-page');
        return new Game();
      }
      default: {
        const { default: Login } = await import('../pages/login/login-page');
        return new Login();
      }
    }
  };
}
