import './style.css';
import BaseComponent from './components/base-component';
import Router from './router/router';
import View from './pages/page';

export default class Controller extends BaseComponent {
  private router: Router;

  constructor() {
    const routerOutlet = new View();
    super(
      {
        tagName: 'div',
        className: 'container',
      },
      routerOutlet,
    );
    this.router = new Router(routerOutlet);
  }
}
