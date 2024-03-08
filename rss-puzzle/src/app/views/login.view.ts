import './login.view.css';
import BaseComponent from '../components/base-component';
import Input from '../components/input/input';
import Button from '../components/button/button';
import { validationServise } from '../servises/validation.servise';
import type { TypeMessage } from '../types/types';

export default class LoginView extends BaseComponent {
  private inputName: BaseComponent;

  private inputNameValue: string | undefined;

  private inputSurname: BaseComponent;

  private inputSurnameValue: string | undefined;

  private buttonEnter: BaseComponent;

  private messageErrorTextName: BaseComponent;

  private messageErrorTextSurname: BaseComponent;

  constructor() {
    super({ tagName: 'form', className: 'form-login' });
    this.inputName = new Input({
      type: 'input',
      classNameInput: 'form-input',
      placeholder: 'Name',
      onInput: (event): void => {
        if (event.currentTarget instanceof HTMLInputElement) {
          this.inputNameValue = event.currentTarget.value;
          this.checkEmptyValue(event.currentTarget.value, this.messageErrorTextName);
          this.checkButton();
        }
      },
    });
    this.messageErrorTextName = new BaseComponent({ tagName: 'span', className: 'error' });

    this.inputSurname = new Input({
      type: 'input',
      classNameInput: 'form-input',
      placeholder: 'Surname',
      onInput: (event): void => {
        if (event.currentTarget instanceof HTMLInputElement) {
          this.inputSurnameValue = event.currentTarget.value;
          this.checkEmptyValue(event.currentTarget.value, this.messageErrorTextSurname);
          this.checkButton();
        }
      },
    });
    this.messageErrorTextSurname = new BaseComponent({ tagName: 'span', className: 'error' });

    this.buttonEnter = this.createButton();
    this.viewWrapper();
  }

  private viewWrapper(): void {
    const inputsWrapper = new BaseComponent({
      tagName: 'div',
      className: 'form-inputs-wrapper',
    });
    inputsWrapper.appendChildren([
      this.inputName,
      this.messageErrorTextName,
      this.inputSurname,
      this.messageErrorTextSurname,
      this.buttonEnter,
    ]);
    this.append(inputsWrapper);
  }

  private createButton(): BaseComponent {
    return new Button({
      className: 'form-button',
      textContent: 'LOGIN',
      onClick: (value): void => {
        if (value.currentTarget instanceof HTMLInputElement) {
          console.log('ok');
        }
      },
    });
  }

  private checkEmptyValue(value: string, input: BaseComponent): void {
    const result = validationServise.isNotEmpty(value);
    if (result.ok) {
      input.removeClass('show');
    }
    if (result.error) {
      this.showErrorMessage(result.error.message, input);
    }
  }

  private showErrorMessage(error: TypeMessage, input: BaseComponent): void {
    input.toggleClass('show');
    input.setTextContent(error);
  }

  private checkButton(): void {
    if (this.inputNameValue && this.inputSurnameValue) {
      this.buttonEnter.removeClass('disabled');
    } else {
      this.buttonEnter.addClass('disabled');
    }
  }
}
