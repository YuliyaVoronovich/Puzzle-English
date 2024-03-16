import './puzzle.css';
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
        new BaseComponent({ tagName: 'span', className: `after` }),
      ),
    );
    let heightPuzzle = '';
    if (height) {
      heightPuzzle = `height:${height}px`;
    }

    cardBlock.setAttribute('style', `width:${width}px;${heightPuzzle};`);
    // cardBlock.getNode().style.backgroundImage = `url(./src/app/data/images/${SettingsServise.mainPicture})`;
    // cardBlock.getNode().style.backgroundPosition = `-${positionX}px  -${positionY}px`;
    cardBlock.setAttribute('data', `${index}`);

    return cardBlock;
  }
}
