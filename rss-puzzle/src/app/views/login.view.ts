import './login.view.css';
import BaseComponent from '../components/base-component';
import Input from '../components/input/input';
import Button from '../components/button/button';
import { validationServise } from '../servises/validation.servise';

export default class LoginView extends BaseComponent {
  private inputName: BaseComponent;

  private inputSurname: BaseComponent;

  private buttonEnter: BaseComponent;

  private messageErrorTextName: BaseComponent;

  private messageErrorTextSurname: BaseComponent;

  private checkValidation = {
    Name: false,
    Surname: false,
  };

  constructor() {
    super({ tagName: 'form', className: 'form-login' });
    this.inputName = new Input({
      type: 'input',
      classNameInput: 'form-input',
      name: 'Name',
      placeholder: 'Name',
      onInput: (element): void => {
        if (element.currentTarget instanceof HTMLInputElement) {
          const result = this.checkValid(element.currentTarget, this.messageErrorTextName);
          const name = 'Name';
          this.checkValidation[name] = result;
          this.checkButton();
        }
      },
    });
    this.messageErrorTextName = new BaseComponent({ tagName: 'span', className: 'error' });

    this.inputSurname = new Input({
      type: 'input',
      classNameInput: 'form-input',
      name: 'Surname',
      placeholder: 'Surname',
      onInput: (element): void => {
        if (element.currentTarget instanceof HTMLInputElement) {
          const result = this.checkValid(element.currentTarget, this.messageErrorTextSurname);
          const name = 'Surname';
          this.checkValidation[name] = result;
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

  private checkValid(target: HTMLInputElement, errorElement: BaseComponent): boolean {
    const result = validationServise.isValidField(target);
    if (result.ok) {
      errorElement.removeClass('show');
      return true;
    }
    if (result.error) {
      this.showErrorMessage(result.error?.message, errorElement);
    }
    return false;
  }

  private showErrorMessage(error: string, errorElement: BaseComponent): void {
    errorElement.addClass('show');
    errorElement.setTextContent(error);
  }

  private checkButton(): void {
    const result = Object.values(this.checkValidation).every((item) => item === true);
    if (!result) {
      this.buttonEnter.addClass('disabled');
    } else {
      this.buttonEnter.removeClass('disabled');
    }
  }
}
