import './game.css';
import BaseComponent from '../../components/base-component';
import Puzzle from '../../components/puzzle/puzzle';

export default class GamePage extends BaseComponent {
  private fieldPicture: BaseComponent;

  constructor() {
    super({ tagName: 'div', className: 'page-wrapper' });
    this.fieldPicture = this.createFieldPicture();
    const linePuzzles = this.createLinePuzzles();
    this.appendChildren([this.fieldPicture, linePuzzles]);
  }

  private createFieldPicture(): BaseComponent {
    return new BaseComponent({
      tagName: 'div',
      className: 'game-field',
      textContent: 'PICTURE',
    });
  }

  private createLinePuzzles(): BaseComponent {
    const phrase = 'They uses my puzzles today'; // from json
    return new BaseComponent(
      {
        tagName: 'div',
        className: 'game-line',
      },
      ...this.generatePuzzles(phrase),
    );
  }

  private generatePuzzles(phrase: string): Puzzle[] {
    return phrase
      .split(' ')
      .map((word, index) => new Puzzle(word, index, (event) => this.clickPuzzle(event)))
      .sort(() => Math.random() - 0.5);
  }

  public clickPuzzle(event: Event): void {
    if (event.currentTarget instanceof HTMLElement) {
      this.fieldPicture.appendHtmlElement(event.currentTarget);
    }
  }
}
