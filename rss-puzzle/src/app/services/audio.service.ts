import { MAIN_PATH_FILES } from '../constants';
import { SettingsService } from './settings.service';

class Sound {
  public play(indexWord: number, audioEnd: () => void): void {
    const audio = new Audio(MAIN_PATH_FILES + SettingsService.currentAudio(indexWord));
    audio
      .play()
      .then(() => {
        audio.addEventListener('ended', () => {
          audioEnd();
        });
      })
      .catch(() => {
        throw new Error('не удалось воспроизвести аудиофайл');
      });
  }
}

export const AudioService = new Sound();
