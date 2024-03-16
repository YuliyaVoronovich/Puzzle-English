import './header.css';
import BaseComponent from '../../../components/base-component';

export default class Header extends BaseComponent {
  private hint: BaseComponent;

  constructor() {
    super({ tagName: 'div', className: 'game-header' });
    this.hint = new BaseComponent({
      tagName: 'div',
      className: 'toolbar-hint',
    });

    this.append(this.hint);
  }
}
