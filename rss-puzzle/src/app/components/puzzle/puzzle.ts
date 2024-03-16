import './puzzle.css';
import { SettingsServise } from '../../services/settings.service';
import BaseComponent from '../base-component';
// import { SettingsServise } from '../../services/settings.service';

export default class Puzzle extends BaseComponent {
  private onClick;

  constructor(
    word: string,
    index: number,
    width: number,
    height: number,
    /*  positionX: number,
    positionY: number, */
    onClick: (element: HTMLElement) => void,
  ) {
    super({
      tagName: 'div',
      className: 'tile-card',
    });

    this.append(this.createCard(word, index, width, height));
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
    // positionX: number,
    // positionY: number,
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
        this.createAfter(index),
      ),
    );
    let heightPuzzle = '';
    if (height) {
      heightPuzzle = `height:${height}px`;
    }

    cardBlock.setAttribute('style', `width:${width}px;${heightPuzzle};`);
    // cardBlock.getNode().style.zIndex = `${8 * 10 - 10 * index}`;
    // cardBlock.getNode().style.backgroundImage = `url(./src/app/data/images/${SettingsServise.mainPicture})`;
    // cardBlock.getNode().style.backgroundPosition = `-${positionX}px  -${positionY}px`;
    cardBlock.setAttribute('data', `${index}`);

    return cardBlock;
  }

  public createAfter(index: number): BaseComponent {
    const after = new BaseComponent({ tagName: 'span', className: `after` });
    if (index === SettingsServise.numWordsInPhrase(SettingsServise.currentIndexPhrase) - 1) {
      after.setAttribute('style', `backgroundColor: #fff; left:0`);
    }
    return after;
  }
}
