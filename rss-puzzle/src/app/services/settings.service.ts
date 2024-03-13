import { DataServise } from './data.service';

class Settings {
  private currentIndexPicture = 8;

  private currentIndexPhrase = 2;

  public widthPicture = 700;

  public mainPicture = DataServise.dataRounds[this.currentIndexPicture].levelData.imageSrc;

  private widthIndent = 10;

  private countIndent = 2;

  private widthGap = 2;

  private countLines = 10;

  public heigthOfLine = 0;

  constructor() {
    const img = new Image();
    img.src = `src/app/data/images/${this.mainPicture}`;
    this.heigthOfLine = ((this.widthPicture / img.width) * img.height) / this.countLines;
  }

  private phrase = DataServise.dataRounds[this.currentIndexPicture].words[this.currentIndexPhrase].textExample;

  public get currentPhrase(): string {
    return this.phrase;
  }

  public get widthMainPicture(): number {
    return this.widthPicture;
  }

  public get countOfLines(): number {
    return this.countLines;
  }

  public get heigthOfLineValue(): number {
    return this.heigthOfLine;
  }

  public set indent(indent: number) {
    this.widthIndent = indent;
  }

  public numWordsInPhrase(): number {
    return this.phrase.split(' ').length;
  }

  public numSymbolsInPhrase(): number {
    return this.phrase.split(' ').join('').length;
  }

  public heigthLine(): void {
    const img = new Image();
    img.src = `src/app/data/images/${this.mainPicture}`;
    this.heigthOfLine = ((700 / img.width) * img.height) / this.countLines;
  }

  public widthCard(word: string): number {
    return (
      ((this.widthPicture -
        this.numWordsInPhrase() * this.countIndent * this.widthIndent -
        this.widthGap * (this.numWordsInPhrase() - 1)) /
        this.numSymbolsInPhrase()) *
        word.length +
      this.countIndent * this.widthIndent
    );
  }
}

export const SettingsServise = new Settings();
