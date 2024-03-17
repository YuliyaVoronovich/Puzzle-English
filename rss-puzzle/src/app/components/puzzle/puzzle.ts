import './puzzle.css';
import { SettingsServise } from '../../services/settings.service';
import BaseComponent from '../base-component';

export class Puzzle extends BaseComponent {
  private onClick;

  public positionYOnset = 12;

  constructor(
    word: string,
    index: number,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    showBack: boolean,
    onClick: (element: HTMLElement) => void,
  ) {
    super({
      tagName: 'div',
      className: 'tile-card',
    });

    this.append(this.createCard(word, index, width, height, positionX, positionY, showBack));
    this.onClick = onClick;
    if (this.onClick) {
      this.addListener('click', () => {
        this.onClick(this.getNode());
      });
    }
  }

  public createCard(
    word: string,
    index: number,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    showBack: boolean,
  ): BaseComponent {
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
    let heightPuzzle = '';
    if (height) {
      heightPuzzle = `height:${height}px`;
    }

    cardBlock.setAttribute('style', `width:${width}px;${heightPuzzle};`);
    //  console.log(showBack);
    if (showBack) {
      cardBlock.getNode().style.backgroundImage = `url(./src/app/data/images/${SettingsServise.mainPicture})`;
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
    if (index === SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase) - 1) {
      after.setAttribute('style', `backgroundColor: #fff; left:0`);
    }
    const posX = positionX + width;
    const posY = positionY + this.positionYOnset;
    if (showBack) {
      after.getNode().style.backgroundImage = `url(./src/app/data/images/${SettingsServise.mainPicture})`;
      after.getNode().style.backgroundPosition = `-${posX}px  -${posY}px`;
    }
    return after;
  }
}
