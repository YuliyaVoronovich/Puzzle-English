import './button.css';
import BaseComponent from '../base-component';

interface IButton {
  className: string;
  textContent: string;
  onClick?: (e: Event) => void;
}

export default class Button extends BaseComponent {
  private onClick;

  constructor({ className, textContent, onClick }: IButton) {
    super({
      tagName: 'button',
      className,
      textContent,
    });
    if (onClick) {
      this.onClick = onClick;
      this.addListener('click', onClick);
    }
  }
}