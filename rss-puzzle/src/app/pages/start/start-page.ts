import './start.css';
import BaseComponent from '../../components/base-component';
import Button from '../../components/button/button';
import { LocalStorageServise } from '../../services/local-storage.service';

export default class StartPage extends BaseComponent {
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
    const buttonEnter = this.createButtonStart();
    const buttonLogout = this.createButtonLogout();
    const stiker = this.createSicker();
    this.appendChildren([pageTitle, pageText, buttonEnter, stiker, buttonLogout]);
  }

  private createButtonStart(): BaseComponent {
    return new Button({
      className: 'form-button page-button',
      textContent: 'START',
      onClick: (): void => {
        document.location.href = `/rss-puzzle/game`;
      },
    });
  }

  private createButtonLogout(): BaseComponent {
    return new Button({
      className: 'button-logout',
      textContent: 'LOGOUT',
      onClick: (event): void => {
        event.preventDefault();
        LocalStorageServise.deleteData('user');
        document.location.href = `/rss-puzzle/`;
        window.history.pushState({}, '', '/');
      },
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