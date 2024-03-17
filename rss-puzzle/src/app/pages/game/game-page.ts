import './game.css';
import Header from './header/header';
import { LocalStorageServise } from '../../services/local-storage.service';
import Button from '../../components/button/button';
import BaseComponent from '../../components/base-component';
import Puzzle from '../../components/puzzle/puzzle';
import { SettingsServise } from '../../services/settings.service';
import type { Hints } from '../../types/types';

export default class GamePage extends BaseComponent {
  private zIndexCoefficient = 10;

  private fieldPicture: BaseComponent;

  private fieldLines: BaseComponent[] = [];

  private linePuzzles: BaseComponent;

  private gameLine: BaseComponent | undefined;

  private hintLine: BaseComponent;

  private buttonContinue: BaseComponent;

  private buttonCheck: BaseComponent;

  private buttonAutofill: BaseComponent;

  private buttonWrapper: BaseComponent;

  private textHint: BaseComponent | undefined;

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
    this.buttonAutofill = this.createButtonAutofill();
    this.hintLine = this.createLineHint();
    this.buttonWrapper = new BaseComponent(
      {
        tagName: 'div',
        className: 'button-wrapper',
      },
      this.buttonContinue,
      this.buttonCheck,
      this.buttonAutofill,
    );
    this.inputPuzzles();
    this.appendChildren([
      new Header(this.changeHints),
      this.fieldPicture,
      this.hintLine,
      this.linePuzzles,
      this.buttonWrapper,
      this.createButtonLogout(),
    ]);
  }

  public changeHints = (hints: Hints): void => {
    console.log(hints);
    if (hints.translate) {
      this.hintLine.addClass('show');
    } else {
      this.hintLine.removeClass('show');
    }
  };

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
      // ...this.generatePuzzles(),
    );
    return this.gameLine;
  }

  public inputPuzzles(): void {
    const puzzles = this.generatePuzzles();
    for (let i = 0; i < puzzles.length; i += 1) {
      puzzles[i].getNode().style.zIndex =
        `${SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase) * this.zIndexCoefficient - this.zIndexCoefficient * i}`;
      this.gameLine?.append(puzzles[i]);
    }
  }

  private generatePuzzles(): Puzzle[] {
    const phrase = SettingsServise.currentPhrase(SettingsServise.currentIndexPhrase);
    return phrase
      .split(' ')
      .map((word, index: number) => {
        return new Puzzle(
          word,
          index,
          SettingsServise.widthCard(word),
          SettingsServise.heigthOfLine,
          /* SettingsServise.moveXPositions[index],
          SettingsServise.moveYPositions[SettingsServise.currentIndexPhrase], */
          this.clickPuzzle,
        );
      })
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

  private createButtonContinue(): BaseComponent {
    return new Button({
      className: 'form-button game-button hide',
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

  private createButtonAutofill(): BaseComponent {
    return new Button({
      className: 'form-button game-button game-button-autofill',
      textContent: "I don't no ;(",
      onClick: (e): void => {
        e.preventDefault();
        this.autofillCards();
      },
    });
  }

  private createHintTranslateText = (): BaseComponent => {
    return new BaseComponent({
      tagName: 'span',
      className: 'text-hint',
      textContent: SettingsServise.textHint(SettingsServise.currentIndexPhrase),
    });
  };

  private createLineHint(): BaseComponent {
    const iconHint = new BaseComponent({
      tagName: 'img',
      className: 'icon-hint',
    });
    iconHint.setAttribute('src', './src/assets/images/hint.png');
    iconHint.setAttribute('alt', '');
    this.textHint = new BaseComponent(
      {
        tagName: 'div',
        className: 'text-hint-wrap',
      },
      this.createHintTranslateText(),
    );
    const hintLine = new BaseComponent(
      {
        tagName: 'div',
        className: 'game-field-hint show',
      },
      new BaseComponent(
        {
          tagName: 'div',
          className: 'icon-hint',
        },
        iconHint,
      ),
      this.textHint,
    );
    if (LocalStorageServise.getHints('translate_hint') === 'false') {
      hintLine.removeClass('show');
    }
    return hintLine;
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
        //  arrayTiles[i].setAttribute('style', `${card.getAttribute('style')}`);
        arrayTiles[i].setAttribute('border', `none`);
        arrayTiles[i].setAttribute(
          'style',
          `z-index: ${SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase) * this.zIndexCoefficient - this.zIndexCoefficient * i}; ${card.getAttribute('style')}`,
        );
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
    let countWords = 0;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (arrayTiles[i].textContent) {
        countWords += 1;
      }
    }
    if (countWords === SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase)) {
      this.buttonCheck.removeClass('hide');
    }
  }

  public checkRightPhrase(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsServise.currentIndexPhrase].getNode().children;
    let resultPhrase = '';
    let error = false;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (Number(arrayTiles[i].children[0].getAttribute('data')) !== i) {
        arrayTiles[i].classList.add('error');
        error = true;
      } else {
        arrayTiles[i].classList.remove('error');
      }
      if (arrayTiles[i].textContent) {
        resultPhrase += `${arrayTiles[i].textContent} `;
      }
    }
    resultPhrase.trim();
    if (resultPhrase.trim() === SettingsServise.currentPhrase(SettingsServise.currentIndexPhrase) && !error) {
      this.buttonContinue.removeClass('hide');
      this.buttonCheck.addClass('hide');
      this.fieldLines[SettingsServise.currentIndexPhrase].addClass('block');
      if (!SettingsServise.hints.translate) {
        this.textHint?.addClass('show');
        this.hintLine.addClass('show');
      }
    }
  }

  public moveToNextRound(): void {
    this.buttonAutofill.removeClass('hide');
    this.hintLine.removeClass('show');
    this.textHint?.removeClass('show');

    if (SettingsServise.currentIndexPhrase === SettingsServise.countOfLines - 1) {
      this.moveToNextPicture();
    } else {
      SettingsServise.currentIndexPhrase += 1;
      if (this.gameLine) {
        this.gameLine.getChildren().forEach((element) => {
          if (element.getNode().classList.contains('show-empty-card')) {
            this.gameLine?.removeChild(element);
          }
        });
        this.gameLine.setHTML('');
        this.textHint?.destroyChildren();
        SettingsServise.moveXCurrentPosition = 0;
        SettingsServise.moveXPositions = [];
        SettingsServise.moveYCurrentPosition = 0;
        SettingsServise.moveYPositions = [];
        SettingsServise.positionsCards();
        this.generatePuzzles();
        this.inputPuzzles();
        this.textHint?.append(this.createHintTranslateText());
        //  this.gameLine.appendChildren(this.generatePuzzles());
        this.buttonContinue.addClass('hide');
        this.buttonCheck.addClass('hide');
      }
    }
  }

  public moveToNextPicture(): void {
    SettingsServise.currentIndexPhrase = 0;
    SettingsServise.currentIndexPicture += 1;
    this.destroyChildren();
    this.fieldPicture.destroyChildren();
    SettingsServise.moveXCurrentPosition = 0;
    SettingsServise.moveXPositions = [];
    SettingsServise.moveYCurrentPosition = 0;
    SettingsServise.moveYPositions = [];
    SettingsServise.positionsCards();
    SettingsServise.setMainPicture();
    this.buttonContinue.addClass('hide');
    this.buttonCheck.addClass('hide');
    this.buttonAutofill.removeClass('hide');

    this.fieldPicture = this.createFieldPicture();
    // this.fieldPicture.setAttribute(
    //   'style',
    //   `background-image: url(src/app/data/images/${SettingsServise.currentMainPicture()})`,
    // );
    this.buttonWrapper = new BaseComponent(
      {
        tagName: 'div',
        className: 'button-wrapper',
      },
      this.buttonContinue,
      this.buttonCheck,
      this.buttonAutofill,
    );
    this.linePuzzles = this.createLinePuzzles();
    this.hintLine = this.createLineHint();
    this.generatePuzzles();
    this.inputPuzzles();
    this.appendChildren([
      new Header(this.changeHints),
      this.fieldPicture,
      this.hintLine,
      this.linePuzzles,
      this.buttonWrapper,
      this.createButtonLogout(),
    ]);
  }

  public autofillCards(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsServise.currentIndexPhrase].getNode().children;
    const arrayPuzzles: BaseComponent[] | undefined = this.gameLine?.getChildren();
    if (arrayPuzzles) {
      arrayPuzzles
        .map((item) => item.getChildren()[0].getNode())
        .sort((a, b) => Number(a.getAttribute('data')) - Number(b.getAttribute('data')))
        .forEach((item, index) => {
          // arrayTiles[index].setAttribute('style', `${item.getAttribute('style')}`);
          arrayTiles[index].setAttribute(
            'style',
            `z-index: ${SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase) * 10 - 10 * index}; ${item.getAttribute('style')}`,
          );
          arrayTiles[index].setAttribute('border', `none`);
          if (item.parentNode instanceof HTMLElement) {
            item.parentNode?.classList.add('show-empty-card');
          }
          arrayTiles[index].classList.remove('empty-card');
          arrayTiles[index].append(item);
        });
    }
    this.checkRightPhrase();
    this.buttonAutofill.addClass('hide');
  }
}
