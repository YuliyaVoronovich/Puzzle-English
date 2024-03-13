import './game.css';
import BaseComponent from '../../components/base-component';
import Puzzle from '../../components/puzzle/puzzle';
import { SettingsServise } from '../../services/settings.service';

export default class GamePage extends BaseComponent {
  private fieldPicture: BaseComponent;

  constructor() {
    super({ tagName: 'div', className: 'game-wrapper' });
    this.fieldPicture = this.createFieldPicture();
    // this.fieldPicture.setAttribute('style', `width:${SettingsServise.widthMainPicture}px`);
    this.fieldPicture.setAttribute(
      'style',
      `background-image: url(src/app/data/images/${SettingsServise.mainPicture})`,
    );
    const linePuzzles = this.createLinePuzzles();
    this.appendChildren([this.fieldPicture, linePuzzles]);
  }

  private createFieldPicture(): BaseComponent {
    return new BaseComponent(
      {
        tagName: 'div',
        className: 'game-field',
      },
      ...this.generateLinesOfField(),
    );
  }

  private createLinePuzzles(): BaseComponent {
    const phrase = SettingsServise.currentPhrase;
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
      .map(
        (word, index) => new Puzzle(word, index, SettingsServise.widthCard(word), (event) => this.clickPuzzle(event)),
      )
      .sort(() => Math.random() - 0.5);
  }

  private generateLinesOfField(): BaseComponent[] {
    const result: BaseComponent[] = [];
    for (let i = 1; i <= SettingsServise.countOfLines; i += 1) {
      const line = new BaseComponent({
        tagName: 'div',
        className: 'field-line',
      });
      line.setAttribute('style', `height:${SettingsServise.heigthOfLine}px`);
      result.push(line);
    }
    return result;
  }

  public clickPuzzle(event: Event): void {
    if (event.currentTarget instanceof HTMLElement) {
      this.fieldPicture.appendHtmlElement(event.currentTarget);
    }
  }
}
