import './game.css';
import BaseComponent from '../../components/base-component';
import Puzzle from '../../components/puzzle/puzzle';
import { SettingsServise } from '../../services/settings.service';

export default class GamePage extends BaseComponent {
  private numLineOpen = 0;

  private fieldPicture: BaseComponent;

  private fieldLines: BaseComponent[] = [];

  private linePuzzles: BaseComponent;

  constructor() {
    super({ tagName: 'div', className: 'game-wrapper' });
    this.fieldPicture = this.createFieldPicture();
    // this.fieldPicture.setAttribute(
    //   'style',
    //   `background-image: url(src/app/data/images/${SettingsServise.mainPicture})`,
    // );
    this.linePuzzles = this.createLinePuzzles();
    this.appendChildren([this.fieldPicture, this.linePuzzles]);
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
        (word, index) =>
          new Puzzle(word, index, SettingsServise.widthCard(word), SettingsServise.heigthOfLine, (event) =>
            this.clickPuzzle(event),
          ),
      )
      .sort(() => Math.random() - 0.5);
  }

  private generateLinesOfField(): BaseComponent[] {
    for (let i = 0; i < SettingsServise.countOfLines; i += 1) {
      const line = new BaseComponent(
        {
          tagName: 'div',
          className: 'field-line',
        },
        ...this.generateTilesOfLine(i),
      );
      line.setAttribute('style', `height:${SettingsServise.heigthOfLine}px`);
      this.fieldLines.push(line);
    }
    return this.fieldLines;
  }

  private generateTilesOfLine(index: number): BaseComponent[] {
    const fieldTilesOfLine: BaseComponent[] = [];
    for (let i = 0; i < SettingsServise.numWordsInPhrase(index); i += 1) {
      const tile = new BaseComponent({
        tagName: 'div',
        className: 'tile-card',
      });
      fieldTilesOfLine.push(tile);
      tile.addListener('click', (event) => this.clickPuzzle(event));
    }
    return fieldTilesOfLine;
  }

  public clickPuzzle(event: Event): void {
    if (event.currentTarget instanceof HTMLElement && event.currentTarget.parentNode instanceof HTMLElement) {
      if (event.currentTarget.parentNode.classList.contains('game-line')) {
        const array: BaseComponent[] = Array.from(this.fieldLines[this.numLineOpen].getChildren());

        for (let i = 0; i < this.fieldLines[0].getChildren().length; i += 1) {
          if (array[i].getNode().childElementCount === 0) {
            const element = event.currentTarget.children[0];
            array[i].setAttribute('style', `${element.getAttribute('style')}`);
            array[i].setAttribute('border', `none`);

            if (element instanceof HTMLElement && element.parentNode instanceof HTMLElement) {
              element.parentNode?.classList.add('show-empty-card');
              array[i].appendHtmlElement(element);
            }
            break;
          }
        }
      } else {
        const array: BaseComponent[] = Array.from(this.linePuzzles.getChildren());
        for (let i = 0; i < this.linePuzzles.getChildren().length; i += 1) {
          if (array[i].getNode().childElementCount === 0) {
            const element = event.currentTarget.children[0];
            array[i].removeClass('show-empty-card');
            element.classList.remove('show-empty-card');

            if (element instanceof HTMLElement && element.parentNode instanceof HTMLElement) {
              array[i].appendHtmlElement(element);
            }
            break;
          }
        }
      }
    }
  }
}
