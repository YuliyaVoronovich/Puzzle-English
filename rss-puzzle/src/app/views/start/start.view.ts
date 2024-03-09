import './start.view.css';
import BaseComponent from '../../components/base-component';

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
    this.appendChildren([pageTitle, pageText]);
  }
}
