import './game.css';
import Button from '../../components/button/button';
import BaseComponent from '../../components/base-component';
import Puzzle from '../../components/puzzle/puzzle';
import { SettingsServise } from '../../services/settings.service';

export default class GamePage extends BaseComponent {
  private fieldPicture: BaseComponent;

  private fieldLines: BaseComponent[] = [];

  private linePuzzles: BaseComponent;

  private gameLine: BaseComponent | undefined;

  private buttonContinue: BaseComponent;

  private buttonCheck: BaseComponent;

  private buttonWrapper: BaseComponent;

  constructor() {
    super({ tagName: 'div', className: 'game-wrapper' });
    this.fieldPicture = this.createFieldPicture();
    // this.fieldPicture.setAttribute(
    //   'style',
    //   `background-image: url(src/app/data/images/${SettingsServise.mainPicture})`,
    // );
    this.linePuzzles = this.createLinePuzzles();
    this.buttonContinue = this.createButtonContinue();
    this.buttonCheck = this.createButtonCheck();
    this.buttonWrapper = new BaseComponent(
      {
        tagName: 'div',
        className: 'button-wrapper',
      },
      this.buttonContinue,
      this.buttonCheck,
    );
    this.appendChildren([this.fieldPicture, this.linePuzzles, this.buttonWrapper]);
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
    this.gameLine = new BaseComponent(
      {
        tagName: 'div',
        className: 'game-line',
      },
      ...this.generatePuzzles(),
    );
    return this.gameLine;
  }

  private generatePuzzles(): Puzzle[] {
    const phrase = SettingsServise.currentPhrase(SettingsServise.currentIndexPhrase);
    return phrase
      .split(' ')
      .map(
        (word, index) =>
          new Puzzle(word, index, SettingsServise.widthCard(word), SettingsServise.heigthOfLine, this.clickPuzzle),
      )
      .sort(() => Math.random() - 0.5);
  }

  private generateLinesOfField(): BaseComponent[] {
    this.fieldLines = [];
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
        className: 'tile-card empty-card',
      });
      tile.addListener('click', () => {
        this.clickPuzzleLine(tile);
      });
      fieldTilesOfLine.push(tile);
    }
    return fieldTilesOfLine;
  }

  private createButtonContinue(): BaseComponent {
    return new Button({
      className: 'form-button game-button disabled',
      textContent: 'Continue',
      onClick: (e): void => {
        e.preventDefault();
        this.moveToNextRound();
      },
    });
  }

  private createButtonCheck(): BaseComponent {
    return new Button({
      className: 'form-button game-button hide',
      textContent: 'Check',
      onClick: (e): void => {
        e.preventDefault();
        this.checkRightPhrase();
      },
    });
  }

  public clickPuzzleLine = (tile: BaseComponent): void => {
    const element = tile.getNode().children[0];
    if (element) {
      for (let i = 0; i < this.linePuzzles.getNode().children.length; i += 1) {
        if (this.linePuzzles.getNode().children[i].classList.contains('show-empty-card')) {
          this.linePuzzles.getNode().children[i].append(element);
          this.linePuzzles.getNode().children[i].classList.remove('show-empty-card');
          tile.getNode().classList.add('empty-card');
          tile.getNode().removeAttribute('style');
          tile.getNode().classList.remove('error');
          break;
        }
      }
    }
    this.buttonCheck.addClass('hide');
  };

  public clickPuzzle = (element: HTMLElement): void => {
    const card = element.children[0];
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsServise.currentIndexPhrase].getNode().children;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (arrayTiles[i].classList.contains('empty-card')) {
        arrayTiles[i].setAttribute('style', `${card.getAttribute('style')}`);
        arrayTiles[i].setAttribute('border', `none`);
        element.classList.add('show-empty-card');
        arrayTiles[i].classList.remove('empty-card');
        arrayTiles[i].append(card);
        break;
      }
    }
    this.checkPhraseFull();
  };

  public checkPhraseFull(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsServise.currentIndexPhrase].getNode().children;
    let resultPhrase = '';
    let countWords = 0;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (arrayTiles[i].textContent) {
        resultPhrase += `${arrayTiles[i].textContent} `;
        countWords += 1;
      }
    }
    resultPhrase.trim();

    if (countWords === SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase)) {
      if (resultPhrase.trim() === SettingsServise.currentPhrase(SettingsServise.currentIndexPhrase)) {
        this.buttonContinue.removeClass('disabled');
      }
      this.buttonCheck.removeClass('hide');
    }
  }

  public checkRightPhrase(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsServise.currentIndexPhrase].getNode().children;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (Number(arrayTiles[i].children[0].getAttribute('data')) !== i) {
        arrayTiles[i].classList.add('error');
      } else {
        arrayTiles[i].classList.remove('error');
      }
    }
  }

  public moveToNextRound(): void {
    if (SettingsServise.currentIndexPhrase === SettingsServise.countOfLines - 1) {
      this.moveToNextPicture();
    }
    SettingsServise.currentIndexPhrase += 1;
    if (this.gameLine) {
      this.gameLine.getChildren().forEach((element) => {
        if (element.getNode().classList.contains('show-empty-card')) {
          this.gameLine?.removeChild(element);
        }
      });
      this.gameLine.setHTML('');
      this.gameLine.appendChildren(this.generatePuzzles());
      this.buttonContinue.addClass('disabled');
      this.buttonCheck.addClass('hide');
    }
  }

  public moveToNextPicture(): void {
    SettingsServise.currentIndexPhrase = 0;
    SettingsServise.currentIndexPicture += 1;
    this.destroyChildren();
    this.fieldPicture.destroyChildren();

    this.fieldPicture = this.createFieldPicture();
    // this.fieldPicture.setAttribute(
    //   'style',
    //   `background-image: url(src/app/data/images/${SettingsServise.currentMainPicture()})`,
    // );
    this.linePuzzles = this.createLinePuzzles();
    this.appendChildren([this.fieldPicture, this.linePuzzles]);
  }
}
