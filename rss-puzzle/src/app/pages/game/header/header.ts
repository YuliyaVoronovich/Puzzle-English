import './header.css';
import BaseComponent from '../../../components/base-component';
import { Button } from '../../../components/button/button';
import { SettingsService } from '../../../services/settings.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import type { Hints } from '../../../interfaces/types';
import { AudioService } from '../../../services/audio.service';

export class Header extends BaseComponent {
  private hintTranslate: BaseComponent;

  public toolbarSound: BaseComponent;

  private isSound = false;

  constructor(private onClickTranslate: (el: Hints) => void) {
    super({ tagName: 'div', className: 'game-header' });
    const hihtLocalStorageTranslate = LocalStorageService.getHints('translate_hint');
    const hihtLocalStorageBackground = LocalStorageService.getHints('picture_hint');
    const hihtLocalStorageAudio = LocalStorageService.getHints('audio_hint');
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
    const selectWrapper = new BaseComponent({
      tagName: 'div',
      className: 'select-wrapper',
    });
    this.appendChildren([this.hintTranslate, this.toolbarSound, selectWrapper]);
  }

  private createMute = (hasHint: boolean): BaseComponent => {
    this.toolbarSound = new BaseComponent(
      {
        tagName: 'div',
        className: 'toolbar-sound',
      },
      new Button({
        className: 'icon-button-sound',
        onClick: (e): void => {
          if (this.isSound) {
            return;
          }
          e.preventDefault();
          this.toolbarSound.addClass('active');
          this.isSound = true;
          AudioService.play(SettingsService.currentIndexPhrase, () => {
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
        onClick: (): void => {
          this.toogleHintTranslate(hintButton);
          this.onClickTranslate(SettingsService.hints);
        },
      }),
    );
    hintButton.toggleClass('hint-on', hasHint);
    return hintButton;
  }

  private toogleHintTranslate(element: BaseComponent): void {
    const hint = LocalStorageService.getHints('translate_hint');
    LocalStorageService.setItem('translate_hint', !hint);
    element.toggleClass('hint-on');
    SettingsService.hints.translate = !hint;
  }

  private createButtonBackground(hasHint: boolean): BaseComponent {
    const hintButtonPicture = new BaseComponent(
      {
        tagName: 'div',
        className: 'hint-background',
      },
      new Button({
        className: 'icon-button',
        onClick: (): void => {
          this.toogleHintBackground(hintButtonPicture);
        },
      }),
    );
    hintButtonPicture.toggleClass('hint-on', hasHint);
    return hintButtonPicture;
  }

  private toogleHintBackground(element: BaseComponent): void {
    const hint = LocalStorageService.getHints('picture_hint');
    LocalStorageService.setItem('picture_hint', !hint);
    element.toggleClass('hint-on');
    SettingsService.hints.picture = !hint;
  }

  private createButtonAudio(hasHint: boolean): BaseComponent {
    const hintButtonAudio = new BaseComponent(
      {
        tagName: 'div',
        className: 'hint-audio',
      },
      new Button({
        className: 'icon-button',
        onClick: (): void => {
          this.toogleHintAudio(hintButtonAudio);
          this.toolbarSound.toggleClass('show');
        },
      }),
    );
    hintButtonAudio.toggleClass('hint-on', hasHint);
    return hintButtonAudio;
  }

  private toogleHintAudio(element: BaseComponent): void {
    const hint = LocalStorageService.getHints('audio_hint');
    LocalStorageService.setItem('audio_hint', !hint);
    element.toggleClass('hint-on');
    SettingsService.hints.audio = !hint;
  }
}
