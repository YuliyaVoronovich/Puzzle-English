import './input.css';
import BaseComponent from '../base-component';

interface IInput {
  type: string;
  classNameInput: string;
  placeholder?: string;
  value?: string | number;
  onInput?: (e: Event) => void;
}

export default class Input extends BaseComponent {
  private onInput;

  constructor({ type, classNameInput, placeholder, value, onInput }: IInput) {
    super({
      tagName: 'input',
      className: classNameInput,
    });
    if (onInput) {
      this.onInput = onInput;
      this.addListener('input', onInput);
    }
    this.setAttributes(type, placeholder, value);
  }

  private setAttributes(type: string, placeholder?: string, value?: string | number): void {
    this.setAttribute('type', type);
    if (placeholder) {
      this.setAttribute('placeholder', placeholder);
    }
    if (value) {
      this.setAttribute('value', value.toString());
    }
  }
}
