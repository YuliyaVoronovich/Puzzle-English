import './puzzle.css';
import BaseComponent from '../base-component';

export default class Puzzle extends BaseComponent {
  private onClick;

  constructor(word: string, index: number, width: number, height: number, onClick: (element: HTMLElement) => void) {
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
    let heightPuzzle = '';
    if (height) {
      heightPuzzle = `height:${height}px`;
    }
    cardBlock.setAttribute('style', `width:${width}px;${heightPuzzle}`);
    super(
      {
        tagName: 'div',
        className: 'tile-card',
      },
      cardBlock,
    );
    this.onClick = onClick;
    if (this.onClick) {
      this.addListener('click', () => {
        this.onClick(this.getNode());
      });
    }
  }
}
