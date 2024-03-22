import './logout.css';
import { LocalStorageService } from '../../services/local-storage.service';
import { Button } from '../button/button';

export class LogoutButton extends Button {
  constructor() {
    super({
      className: 'button-logout',
      textContent: 'LOGOUT',
      onClick: (event): void => {
        event.preventDefault();
        LocalStorageService.deleteData('user');
        LocalStorageService.deleteData('translate_hint');
        LocalStorageService.deleteData('audio_hint');
        LocalStorageService.deleteData('picture_hint');
        document.location.href = `./`;
        window.history.pushState({}, '', '/');
      },
    });
  }
}
