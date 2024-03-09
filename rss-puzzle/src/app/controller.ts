import './style.css';
import BaseComponent from './components/base-component';
// import LoginView from './views/login/login.view';
import StartView from './views/start/start.view';

export default class Controller extends BaseComponent {
  private view: BaseComponent;

  constructor() {
    super({
      tagName: 'div',
      className: 'container',
    });
    // this.view = new LoginView(); // load different view future
    this.view = new StartView();
    this.append(this.view);
  }
}
