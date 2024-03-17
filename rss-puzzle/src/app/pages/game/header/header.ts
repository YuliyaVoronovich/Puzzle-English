import './header.css';
import BaseComponent from '../../../components/base-component';
import { Button } from '../../../components/button/button';
import { SettingsServise } from '../../../services/settings.service';
import { LocalStorageServise } from '../../../services/local-storage.service';
import type { Hints } from '../../../types/types';
import { AudioServise } from '../../../services/audio.service';

export class Header extends BaseComponent {
  private hintTranslate: BaseComponent;

  public toolbarSound: BaseComponent;

  private isSound = false;

  constructor(
    private onClickTranslate: (el: Hints) => void,
    private onClickBackground: (el: Hints) => void,
  ) {
    super({ tagName: 'div', className: 'game-header' });
    const hihtLocalStorageTranslate = LocalStorageServise.getHints('translate_hint');
    const hihtLocalStorageBackground = LocalStorageServise.getHints('picture_hint');
    const hihtLocalStorageAudio = LocalStorageServise.getHints('audio_hint');
    const iconHintTranslate = this.createButtonTranslate(hihtLocalStorageTranslate);
    const iconHintBackground = this.createButtonBackground(hihtLocalStorageBackground);
    const iconHintAudio = this.createButtonAudio(hihtLocalStorageAudio);
    this.toolbarSound = this.createMute(hihtLocalStorageAudio);
    this.hintTranslate = new BaseComponent(
      {
        tagName: 'div',
        className: 'toolbar-hints',
      },
      iconHintTranslate,
      iconHintBackground,
      iconHintAudio,
    );
    this.appendChildren([this.hintTranslate, this.toolbarSound]);
  }

  private createMute = (hasHint: boolean): BaseComponent => {
    this.toolbarSound = new BaseComponent(
      {
        tagName: 'div',
        className: 'toolbar-sound',
      },
      new Button({
        className: 'icon-button-sound',
        textContent: '',
        onClick: (e): void => {
          if (this.isSound) {
            return;
          }
          e.preventDefault();
          this.toolbarSound.addClass('active');
          this.isSound = true;
          AudioServise.play(SettingsServise.currentIndexPhrase, () => {
            this.toolbarSound.removeClass('active');
            this.isSound = false;
          });
        },
      }),
    );
    this.toolbarSound.toggleClass('show', hasHint);
    return this.toolbarSound;
  };

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

  private createButtonAudio(hasHint: boolean): BaseComponent {
    const hintButtonAudio = new BaseComponent(
      {
        tagName: 'div',
        className: 'hint-audio',
      },
      new Button({
        className: 'icon-button',
        onClick: (e): void => {
          e.preventDefault();
          this.toogleHintAudio(hintButtonAudio);
          this.toolbarSound.toggleClass('show');
          // this.onClickBackground(SettingsServise.hints);
        },
      }),
    );
    hintButtonAudio.toggleClass('hint-on', hasHint);
    return hintButtonAudio;
  }

  private toogleHintAudio(element: BaseComponent): void {
    const hint = LocalStorageServise.getHints('audio_hint');
    LocalStorageServise.setItem('audio_hint', !hint);
    element.toggleClass('hint-on');
    SettingsServise.hints.audio = !hint;
  }
}
