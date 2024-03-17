import './header.css';
import BaseComponent from '../../../components/base-component';
import Button from '../../../components/button/button';
import { SettingsServise } from '../../../services/settings.service';
import { LocalStorageServise } from '../../../services/local-storage.service';
import type { Hints } from '../../../types/types';

export default class Header extends BaseComponent {
  private hint: BaseComponent;

  private onClick;

  constructor(onClick: (el: Hints) => void) {
    super({ tagName: 'div', className: 'game-header' });
    const iconHint = this.createButtonCheckTranslate();
    this.onClick = onClick;
    this.hint = new BaseComponent(
      {
        tagName: 'div',
        className: 'toolbar-hints',
      },
      iconHint,
    );
    this.addListener('click', (e) => {
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        if (e.target?.classList.contains('icon-button')) {
          this.onClick(SettingsServise.hints);
        }
      }
    });

    this.append(this.hint);
  }

  private createButtonCheckTranslate(): BaseComponent {
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
          this.toogleIconHint(hintButton);
        },
      }),
    );
    if (LocalStorageServise.getHints('translate_hint') === 'true') {
      hintButton.addClass('hint-on');
    } else {
      hintButton.removeClass('hint-on');
    }

    return hintButton;
  }

  private toogleIconHint(element: BaseComponent): void {
    const hint = LocalStorageServise.getHints('translate_hint') === 'false';
    LocalStorageServise.setItem('translate_hint', hint);
    element.toggleClass('hint-on');
    SettingsServise.hints.translate = hint;
  }
}
