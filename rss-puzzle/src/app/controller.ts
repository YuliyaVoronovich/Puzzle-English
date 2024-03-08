import './style.css';
import BaseComponent from './components/base-component';
import LoginView from './views/login.view';

export default class Controller extends BaseComponent {
  private view: BaseComponent;

  constructor() {
    super({
      tagName: 'div',
      className: 'container',
    });
    this.view = new LoginView(); // load different view future
    this.append(this.view);
  }
}
