import './logout.css';
import { LocalStorageServise } from '../../services/local-storage.service';
import { Button } from '../button/button';

export class Logout extends Button {
  constructor() {
    super({
      className: 'button-logout',
      textContent: 'LOGOUT',
      onClick: (event): void => {
        event.preventDefault();
        LocalStorageServise.deleteData('user');
        LocalStorageServise.deleteData('translate_hint');
        LocalStorageServise.deleteData('audio_hint');
        LocalStorageServise.deleteData('picture_hint');
        document.location.href = `./`;
        window.history.pushState({}, '', '/');
      },
    });
  }
}
