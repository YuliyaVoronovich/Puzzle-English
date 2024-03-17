import './header.css';
import BaseComponent from '../../../components/base-component';
import { Button } from '../../../components/button/button';
import { SettingsServise } from '../../../services/settings.service';
import { LocalStorageServise } from '../../../services/local-storage.service';
import type { Hints } from '../../../types/types';

export class Header extends BaseComponent {
  private hintTranslate: BaseComponent;

  constructor(
    private onClickTranslate: (el: Hints) => void,
    private onClickBackground: (el: Hints) => void,
  ) {
    super({ tagName: 'div', className: 'game-header' });
    const hihtLocalStorageTranslate = LocalStorageServise.getHints('translate_hint');
    const hihtLocalStorageBackground = LocalStorageServise.getHints('picture_hint');
    const iconHintTranslate = this.createButtonTranslate(hihtLocalStorageTranslate);
    const iconHintBackground = this.createButtonBackground(hihtLocalStorageBackground);
    this.hintTranslate = new BaseComponent(
      {
        tagName: 'div',
        className: 'toolbar-hints',
      },
      iconHintTranslate,
      iconHintBackground,
    );
    this.append(this.hintTranslate);
  }

  private createButtonTranslate(hasHint: boolean): BaseComponent {
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
          this.onClickTranslate(SettingsServise.hints);
        },
      }),
    );
    hintButton.toggleClass('hint-on', hasHint);
    return hintButton;
  }

  private toogleHintTranslate(element: BaseComponent): void {
    const hint = LocalStorageServise.getHints('translate_hint');
    LocalStorageServise.setItem('translate_hint', !hint);
    element.toggleClass('hint-on');
    SettingsServise.hints.translate = !hint;
  }

  private createButtonBackground(hasHint: boolean): BaseComponent {
    const hintButtonPicture = new BaseComponent(
      {
        tagName: 'div',
        className: 'hint-background',
      },
      new Button({
        className: 'icon-button',
        onClick: (e): void => {
          e.preventDefault();
          this.toogleHintBackground(hintButtonPicture);
          this.onClickBackground(SettingsServise.hints);
        },
      }),
    );
    hintButtonPicture.toggleClass('hint-on', hasHint);
    return hintButtonPicture;
  }

  private toogleHintBackground(element: BaseComponent): void {
    const hint = LocalStorageServise.getHints('picture_hint');
    LocalStorageServise.setItem('picture_hint', !hint);
    element.toggleClass('hint-on');
    SettingsServise.hints.picture = !hint;
  }
}
