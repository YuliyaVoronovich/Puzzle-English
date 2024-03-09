import './start.view.css';
import BaseComponent from '../../components/base-component';
import Button from '../../components/button/button';
import { LocalStorageServise } from '../../servises/local-storage.servise';

export default class StartView extends BaseComponent {
  constructor() {
    super({ tagName: 'div', className: 'page-wrapper' });
    const pageTitle = new BaseComponent({
      tagName: 'h2',
      className: 'page-title',
      textContent: 'Welcome to the game RSS-PUZZLE',
    });
    const pageText = new BaseComponent({
      tagName: 'p',
      className: 'page-text',
      textContent:
        'Collect puzzles and learn English! Make unique offers and discover amazing pictures! Click and drag small pieces onto the field and gradually reveal fragments of the picture. If you encounter any difficulties, use the hints. Enjoy relaxing puzzles to train your brain and improve your language level!',
    });
    const buttonEnter = this.createButton();
    buttonEnter.addClass('page-button');
    const stiker = this.createSicker();
    this.appendChildren([pageTitle, pageText, buttonEnter, stiker]);
  }

  private createButton(): BaseComponent {
    return new Button({
      className: 'form-button',
      textContent: 'START',
      onClick: (): void => {},
    });
  }

  private createSicker(): BaseComponent {
    return new BaseComponent(
      {
        tagName: 'div',
        className: 'page-sticker',
      },
      new BaseComponent({
        tagName: 'span',
        className: 'page-sticker-text',
        textContent: this.createGreeting(),
      }),
    );
  }

  private createGreeting(): string {
    const user = LocalStorageServise.getUser('user');
    if (user) {
      return `Hello, ${user.name} ${user.surname}!`;
    }
    return '';
  }
}
