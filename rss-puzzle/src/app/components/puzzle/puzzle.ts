import './puzzle.css';

import { SettingsService } from '../../services/settings.service';
import BaseComponent from '../base-component';
import { MAIN_PATH } from '../../constants';

type Card = {
  word: string;
  index: number;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  showBack: boolean;
  onClick?: (element: HTMLElement) => void;
};

export class Puzzle extends BaseComponent {
  private readonly positionYOnset = 12;

  constructor({ word, index, width, height, positionX, positionY, showBack, onClick }: Card) {
    super({
      tagName: 'div',
      className: 'tile-card',
    });

    this.append(this.createCard({ word, index, width, height, positionX, positionY, showBack }));
    if (!onClick) {
      return;
    }
    if (onClick) {
      this.addListener('click', () => {
        onClick(this.getNode());
      });
    }
  }

  public createCard({ word, index, width, height, positionX, positionY, showBack }: Card): BaseComponent {
    const cardBlock = new BaseComponent(
      {
        tagName: 'div',
        className: `tile-${index} card`,
      },
      new BaseComponent(
        {
          tagName: 'div',
          className: `word`,
          textContent: word,
        },
        this.createAfter(index, positionX, positionY, width, showBack),
      ),
    );
    const puzzleHeight = height ? `height:${height}px` : '';

    cardBlock.setAttribute('style', `width:${width}px;${puzzleHeight};`);
    if (showBack) {
      cardBlock.getNode().style.backgroundImage = `url(${MAIN_PATH}${SettingsService.mainPicture})`;
      cardBlock.getNode().style.backgroundPosition = `-${positionX}px  -${positionY}px`;
    }

    cardBlock.setAttribute('data', `${index}`);

    return cardBlock;
  }

  public createAfter(
    index: number,
    positionX: number,
    positionY: number,
    width: number,
    showBack: boolean,
  ): BaseComponent {
    const after = new BaseComponent({ tagName: 'span', className: `after` });
    if (index === SettingsService.numWordsInPhrase(SettingsService.currentIndexPhrase) - 1) {
      after.setAttribute('style', `backgroundColor: #fff; left:0`);
    }
    const posX = positionX + width;
    const posY = positionY + this.positionYOnset;
    if (showBack) {
      after.getNode().style.backgroundImage = `url(${MAIN_PATH}${SettingsService.mainPicture})`;
      after.getNode().style.backgroundPosition = `-${posX}px  -${posY}px`;
    }
    return after;
  }
}
