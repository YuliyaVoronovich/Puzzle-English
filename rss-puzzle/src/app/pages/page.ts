import BaseComponent from '../components/base-component';

export default class Page extends BaseComponent {
  constructor() {
    super({ tagName: 'main', className: 'main' });
  }

  public setContent(section: BaseComponent): void {
    this.replaceChild(section);
  }
}
