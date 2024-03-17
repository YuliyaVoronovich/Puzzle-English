import { SettingsServise } from './settings.service';

class Sound {
  public play(indexWord: number, audioEnd: () => void): void {
    const path = 'https://github.com/rolling-scopes-school/rss-puzzle-data/raw/main/';
    const audio = new Audio(path + SettingsServise.currentAudio(indexWord));
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

export const AudioServise = new Sound();
