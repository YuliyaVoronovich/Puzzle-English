import './input.css';
import BaseComponent from '../base-component';

interface IInput {
  type: string;
  classNameInput: string;
  name: string;
  placeholder?: string;
  value?: string | number;
  onInput?: (e: Event) => void;
}

export default class Input extends BaseComponent {
  constructor({ type, classNameInput, name, placeholder, value, onInput }: IInput) {
    super({
      tagName: 'input',
      className: classNameInput,
    });
    if (onInput) {
      this.addListener('change', onInput);
    }
    this.setAttributes(type, name, placeholder, value);
  }

  private setAttributes(type: string, name: string, placeholder?: string, value?: string | number): void {
    this.setAttribute('name', name);
    this.setAttribute('type', type);
    if (placeholder) {
      this.setAttribute('placeholder', placeholder);
    }
    if (value) {
      this.setAttribute('value', value.toString());
    }
  }
}
