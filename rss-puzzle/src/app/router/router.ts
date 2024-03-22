import type BaseComponent from '../components/base-component';
import type Page from '../pages/page';
import { LocalStorageService } from '../services/local-storage.service';

export default class Router {
  constructor(private routerOutlet: Page) {
    window.addEventListener('hashchange', this.handleLocationChange.bind(this));
    this.handleLocationChange();
  }

  public handleLocationChange(): void {
    const isUser: boolean = LocalStorageService.checkUser('user');
    const pathname = window.location.hash.slice(1);

    let currentPath;
    if (!isUser) {
      currentPath = '/';
    } else if (!pathname) {
      currentPath = '/welcome';
    } else {
      currentPath = `/${pathname}`;
    }
    this.setViewContent(currentPath)
      .then((curentPageView) => {
        this.routerOutlet.setContent(curentPageView);
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
