import { DataServise } from './data.service';

class Settings {
  public currentIndexPicture = 0;

  public currentIndexPhrase = 0;

  public widthPicture = 700;

  public mainPicture = DataServise.dataRounds[this.currentIndexPicture].levelData.imageSrc;

  private widthIndent = 10;

  private countIndent = 2;

  private widthGap = 0;

  private countLines = 10;

  public heigthOfLine = 0;

  constructor() {
    const img = new Image();
    img.src = `src/app/data/images/${this.mainPicture}`;
    this.heigthOfLine = ((this.widthPicture / img.width) * img.height) / this.countLines;
  }

  public currentPhrase(index: number = this.currentIndexPicture): string {
    return DataServise.dataRounds[this.currentIndexPicture].words[index].textExample;
  }

  public currentMainPicture(index: number = this.currentIndexPicture): string {
    return DataServise.dataRounds[index].levelData.imageSrc;
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

  public numWordsInPhrase(indexPhrase: number = this.currentIndexPhrase): number {
    return DataServise.dataRounds[this.currentIndexPicture].words[indexPhrase].textExample.split(' ').length;
  }

  public numSymbolsInPhrase(indexPhrase: number = this.currentIndexPhrase): number {
    return DataServise.dataRounds[this.currentIndexPicture].words[indexPhrase].textExample.split(' ').join('').length;
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
