import './game.css';

import { Header } from './header/header';
import { LocalStorageService } from '../../services/local-storage.service';
import { Button } from '../../components/button/button';
import BaseComponent from '../../components/base-component';
import { Puzzle } from '../../components/puzzle/puzzle';
import { SettingsService } from '../../services/settings.service';
import type { Hints } from '../../interfaces/types';
import { LogoutButton } from '../../components/logout/logout';
import { MAIN_PATH } from '../../constants';

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

  private headerPage: Header;

  public dopinfo: BaseComponent | undefined;

  private showBackgroundOnCard = true;

  constructor() {
    super({ tagName: 'div', className: 'game-wrapper' });
    this.fieldPicture = this.createFieldPicture();
    this.linePuzzles = this.createLinePuzzles();
    this.buttonContinue = this.createButtonContinue();
    this.buttonCheck = this.createCheckButton();
    this.buttonAutofill = this.createButtonAutofill();
    this.hintLine = this.createLineHint();
    this.headerPage = new Header(this.changeHintTranslate);
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
      this.headerPage,
      this.fieldPicture,
      this.hintLine,
      this.linePuzzles,
      this.buttonWrapper,
      new LogoutButton(),
    ]);
  }

  public changeHintTranslate = (hints: Hints): void => {
    if (hints.translate) {
      this.hintLine.addClass('show');
    } else {
      this.hintLine.removeClass('show');
    }
  };

  public createInfoPicture(): BaseComponent {
    return new BaseComponent(
      {
        tagName: 'div',
        className: 'dop-info-inner',
      },
      new BaseComponent({
        tagName: 'span',
        className: 'dop-info-author',
        textContent: SettingsService.getDataPictureAuthor(SettingsService.currentIndexPicture),
      }),
      new BaseComponent({
        tagName: 'span',
        className: 'dop-info-name',
        textContent: `${SettingsService.getDataPictureName(SettingsService.currentIndexPicture)} - (${SettingsService.getDataPictureYear(SettingsService.currentIndexPicture)})`,
      }),
    );
  }

  private createFieldPicture(): BaseComponent {
    this.dopinfo = new BaseComponent(
      {
        tagName: 'div',
        className: 'dop-info',
      },
      this.createInfoPicture(),
    );

    return new BaseComponent(
      {
        tagName: 'div',
        className: 'game-field',
      },
      ...this.generateLinesOfField(),
      this.dopinfo,
    );
  }

  private createLinePuzzles(): BaseComponent {
    this.gameLine = new BaseComponent({
      tagName: 'div',
      className: 'game-line',
    });
    return this.gameLine;
  }

  public inputPuzzles(): void {
    const puzzles = this.generatePuzzles();
    for (let i = 0; i < puzzles.length; i += 1) {
      puzzles[i].getNode().style.zIndex =
        `${SettingsService.numWordsInPhrase(SettingsService.currentIndexPhrase) * this.zIndexCoefficient - this.zIndexCoefficient * i}`;
      this.gameLine?.append(puzzles[i]);
    }
  }

  private generatePuzzles(): Puzzle[] {
    const phrase = SettingsService.currentPhrase(SettingsService.currentIndexPhrase);

    return phrase
      .split(' ')
      .map((word, index: number) => {
        return new Puzzle({
          word,
          index,
          width: SettingsService.widthCard(word),
          height: SettingsService.heigthOfLine,
          positionX: SettingsService.moveXPositions[index],
          positionY: SettingsService.moveYPositions[SettingsService.currentIndexPhrase],
          showBack: this.showBackgroundOnCard,
          onClick: this.clickPuzzle,
        });
      })
      .sort(() => Math.random() - 0.5);
  }

  private generateLinesOfField(): BaseComponent[] {
    this.fieldLines = [];
    for (let i = 0; i < SettingsService.countOfLines; i += 1) {
      const line = new BaseComponent(
        {
          tagName: 'div',
          className: 'field-line',
        },
        ...this.generateTilesOfLine(i),
      );
      line.setAttribute('style', `height:${SettingsService.heigthOfLine}px`);
      this.fieldLines.push(line);
    }
    return this.fieldLines;
  }

  private generateTilesOfLine(index: number): BaseComponent[] {
    const fieldTilesOfLine: BaseComponent[] = [];
    for (let i = 0; i < SettingsService.numWordsInPhrase(index); i += 1) {
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

  private createButtonContinue(): Button {
    return new Button({
      className: 'form-button game-button hide',
      textContent: 'Continue',
      onClick: (e): void => {
        e.preventDefault();
        this.moveToNextRound();
      },
    });
  }

  private createCheckButton(): Button {
    return new Button({
      className: 'form-button game-button hide',
      textContent: 'Check',
      onClick: (e): void => {
        e.preventDefault();
        this.checkRightPhrase();
      },
    });
  }

  private createButtonAutofill(): Button {
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
      textContent: SettingsService.textHint(SettingsService.currentIndexPhrase),
    });
  };

  private createLineHint(): BaseComponent {
    const iconHint = new BaseComponent({
      tagName: 'img',
      className: 'icon-hint',
    });
    const img = new URL('../../../assets/images/hint.png', import.meta.url).href;
    iconHint.setAttribute('src', img);
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
    if (!LocalStorageService.getHints('translate_hint')) {
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
          tile.getNode().classList.remove('wrong');
          break;
        }
      }
    }
    this.buttonCheck.addClass('hide');
  };

  public clickPuzzle = (element: HTMLElement): void => {
    const card = element.children[0];
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsService.currentIndexPhrase].getNode().children;
    if (card) {
      for (let i = 0; i < arrayTiles.length; i += 1) {
        if (arrayTiles[i].classList.contains('empty-card')) {
          arrayTiles[i].setAttribute('border', `none`);
          if (card instanceof HTMLElement) {
            arrayTiles[i].setAttribute(
              'style',
              `z-index: ${SettingsService.numWordsInPhrase(SettingsService.currentIndexPhrase) * this.zIndexCoefficient - this.zIndexCoefficient * i};
            width: ${card.style.width}, height: ${card.style.height}`,
            );
          }
          element.classList.add('show-empty-card');
          arrayTiles[i].classList.remove('empty-card');
          arrayTiles[i].append(card);
          break;
        }
      }
    }
    this.checkPhraseFull();
  };

  public checkPhraseFull(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsService.currentIndexPhrase].getNode().children;
    let countWords = 0;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (arrayTiles[i].textContent) {
        countWords += 1;
      }
    }
    if (countWords === SettingsService.numWordsInPhrase(SettingsService.currentIndexPhrase)) {
      this.buttonCheck.removeClass('hide');
    }
  }

  public checkRightPhrase(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsService.currentIndexPhrase].getNode().children;
    let resultPhrase = '';
    let error = false;
    for (let i = 0; i < arrayTiles.length; i += 1) {
      if (Number(arrayTiles[i].children[0].getAttribute('data')) !== i) {
        arrayTiles[i].classList.add('wrong');
        error = true;
      } else {
        arrayTiles[i].classList.remove('wrong');
      }
      if (arrayTiles[i].textContent) {
        resultPhrase += `${arrayTiles[i].textContent} `;
      }
    }
    resultPhrase.trim();
    if (resultPhrase.trim() === SettingsService.currentPhrase(SettingsService.currentIndexPhrase) && !error) {
      if (SettingsService.currentIndexPhrase === SettingsService.countOfLines - 1) {
        this.showFullPicture();
      }
      this.buttonContinue.removeClass('hide');
      this.buttonCheck.addClass('hide');
      this.fieldLines[SettingsService.currentIndexPhrase].addClass('block');
      if (!SettingsService.hints.translate) {
        this.textHint?.addClass('show');
      }
      if (!SettingsService.hints.audio) {
        this.headerPage.toolbarSound.addClass('show');
      }
    }
  }

  public moveToNextRound(): void {
    this.buttonAutofill.removeClass('hide');
    this.textHint?.removeClass('show');
    if (!SettingsService.hints.audio) {
      this.headerPage.toolbarSound.removeClass('show');
    }

    if (SettingsService.currentIndexPhrase === SettingsService.countOfLines - 1) {
      this.moveToNextPicture();
    } else {
      SettingsService.currentIndexPhrase += 1;
      if (this.gameLine) {
        this.gameLine.getChildren().forEach((element) => {
          if (element.getNode().classList.contains('show-empty-card')) {
            this.gameLine?.removeChild(element);
          }
        });
        this.gameLine.setHTML('');
        this.textHint?.destroyChildren();
        SettingsService.moveXCurrentPosition = 0;
        SettingsService.moveXPositions = [];
        SettingsService.moveYCurrentPosition = 0;
        SettingsService.moveYPositions = [];
        SettingsService.positionsCards();
        this.generatePuzzles();
        this.inputPuzzles();
        this.textHint?.append(this.createHintTranslateText());
        this.buttonContinue.addClass('hide');
        this.buttonCheck.addClass('hide');
      }
    }
  }

  public moveToNextPicture(): void {
    SettingsService.currentIndexPhrase = 0;
    SettingsService.currentIndexPicture += 1;
    this.destroyChildren();
    this.fieldPicture.destroyChildren();
    SettingsService.moveXCurrentPosition = 0;
    SettingsService.moveXPositions = [];
    SettingsService.moveYCurrentPosition = 0;
    SettingsService.moveYPositions = [];
    SettingsService.positionsCards();
    SettingsService.setMainPicture();
    this.buttonContinue.addClass('hide');
    this.buttonCheck.addClass('hide');
    this.buttonAutofill.removeClass('hide');

    this.fieldPicture = this.createFieldPicture();

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
    this.headerPage = new Header(this.changeHintTranslate);
    this.generatePuzzles();
    this.inputPuzzles();
    this.appendChildren([
      this.headerPage,
      this.fieldPicture,
      this.hintLine,
      this.linePuzzles,
      this.buttonWrapper,
      new LogoutButton(),
    ]);
  }

  public autofillCards(): void {
    const arrayTiles: HTMLCollection = this.fieldLines[SettingsService.currentIndexPhrase].getNode().children;
    const arrayPuzzles: BaseComponent[] | undefined = this.gameLine?.getChildren();
    if (arrayPuzzles) {
      arrayPuzzles
        .map((item) => item.getChildren()[0].getNode())
        .sort((a, b) => Number(a.getAttribute('data')) - Number(b.getAttribute('data')))
        .forEach((item, index) => {
          arrayTiles[index].setAttribute(
            'style',
            `z-index: ${SettingsService.numWordsInPhrase(SettingsService.currentIndexPhrase) * 10 - 10 * index}; width: ${item.style.width}; height: ${item.style.height}`,
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

  public showFullPicture(): void {
    this.fieldLines.forEach((item) => {
      item.addClass('opacity');
    });
    this.fieldPicture.setAttribute('style', `background-image: url(${MAIN_PATH}${SettingsService.mainPicture})`);
    this.dopinfo?.destroyChildren();
    this.dopinfo?.append(this.createInfoPicture());
    this.dopinfo?.addClass('show');
  }
}
