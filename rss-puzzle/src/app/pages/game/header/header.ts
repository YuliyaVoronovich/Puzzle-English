import './header.css';
import BaseComponent from '../../../components/base-component';
import Button from '../../../components/button/button';
import { SettingsServise } from '../../../services/settings.service';
import { LocalStorageServise } from '../../../services/local-storage.service';
import type { Hints } from '../../../types/types';

export default class Header extends BaseComponent {
  private hintTranslate: BaseComponent;

  private onClick;

  constructor(onClick: (el: Hints) => void) {
    super({ tagName: 'div', className: 'game-header' });
    const iconHintTranslate = this.createButtonTranslate();
    const iconHintBackground = this.createButtonBackground();
    this.onClick = onClick;
    this.hintTranslate = new BaseComponent(
      {
        tagName: 'div',
        className: 'toolbar-hints',
      },
      iconHintTranslate,
      iconHintBackground,
    );
    this.addListener('click', (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        if (e.target?.classList.contains('icon-button')) {
          this.onClick(SettingsServise.hints);
        }
      }
    });

    this.append(this.hintTranslate);
  }

  private createButtonTranslate(): BaseComponent {
    const hintButton = new BaseComponent(
      {
        tagName: 'div',
        className: 'hint-translate',
      },
      new Button({
        className: 'icon-button',
        textContent: '',
        onClick: (e): void => {
          e.preventDefault();
          this.toogleHintTranslate(hintButton);
        },
      }),
    );
    if (LocalStorageServise.getHints('translate_hint')) {
      hintButton.addClass('hint-on');
    } else {
      hintButton.removeClass('hint-on');
    }
    return hintButton;
  }

  private toogleHintTranslate(element: BaseComponent): void {
    const hint = LocalStorageServise.getHints('translate_hint');
    LocalStorageServise.setItem('translate_hint', !hint);
    element.toggleClass('hint-on');
    SettingsServise.hints.translate = !hint;
  }

  private createButtonBackground(): BaseComponent {
    const hintButtonPicture = new BaseComponent(
      {
        tagName: 'div',
        className: 'hint-background',
      },
      new Button({
        className: 'icon-button',
        textContent: '',
        onClick: (e): void => {
          e.preventDefault();
          this.toogleHintBackground(hintButtonPicture);
        },
      }),
    );
    if (LocalStorageServise.getHints('picture_hint')) {
      hintButtonPicture.addClass('hint-on');
    } else {
      hintButtonPicture.removeClass('hint-on');
    }
    return hintButtonPicture;
  }

  private toogleHintBackground(element: BaseComponent): void {
    const hint = LocalStorageServise.getHints('picture_hint');
    LocalStorageServise.setItem('picture_hint', !hint);
    element.toggleClass('hint-on');
    SettingsServise.hints.picture = !hint;
  }
}
