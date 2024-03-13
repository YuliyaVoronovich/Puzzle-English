import './puzzle.css';
import BaseComponent from '../base-component';

export default class Puzzle extends BaseComponent {
  private onClick;

  constructor(word: string, index: number, width: number, onClick: (event: Event) => void) {
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
        new BaseComponent({
          tagName: 'span',
          className: `after`,
        }),
      ),
    );
    cardBlock.setAttribute('style', `width:${width}px`);
    super(
      {
        tagName: 'div',
        className: 'tile-card',
      },
      cardBlock,
    );
    this.onClick = onClick;
    if (this.onClick) {
      this.addListener('click', this.onClick);
    }
  }
}
