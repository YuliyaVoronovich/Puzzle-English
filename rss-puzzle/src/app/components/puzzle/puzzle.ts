import './puzzle.css';
import { SettingsServise } from '../../services/settings.service';
import BaseComponent from '../base-component';

export default class Puzzle extends BaseComponent {
  private onClick;

  public positionYOnset = 12;

  constructor(
    word: string,
    index: number,
    width: number,
    height: number,
    positionX: number,
    positionY: number,
    onClick: (element: HTMLElement) => void,
  ) {
    super({
      tagName: 'div',
      className: 'tile-card',
    });

    this.append(this.createCard(word, index, width, height, positionX, positionY));
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
        this.createAfter(index, positionX, positionY, width),
      ),
    );
    let heightPuzzle = '';
    if (height) {
      heightPuzzle = `height:${height}px`;
    }

    cardBlock.setAttribute('style', `width:${width}px;${heightPuzzle};`);
    cardBlock.getNode().style.backgroundImage = `url(./src/app/data/images/${SettingsServise.mainPicture})`;
    cardBlock.getNode().style.backgroundPosition = `-${positionX}px  -${positionY}px`;
    cardBlock.setAttribute('data', `${index}`);

    return cardBlock;
  }

  public createAfter(index: number, positionX: number, positionY: number, width: number): BaseComponent {
    const after = new BaseComponent({ tagName: 'span', className: `after` });
    if (index === SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase) - 1) {
      after.setAttribute('style', `backgroundColor: #fff; left:0`);
    }
    const posX = positionX + width;
    const posY = positionY + this.positionYOnset;
    after.getNode().style.backgroundImage = `url(./src/app/data/images/${SettingsServise.mainPicture})`;
    after.getNode().style.backgroundPosition = `-${posX}px  -${posY}px`;
    return after;
  }
}
