import { DataServise } from './data.service';

class Settings {
  public currentIndexPicture = 0;

  public currentIndexPhrase = 0;

  public widthPicture = 700;

  public mainPicture = '';

  private widthIndent = 10;

  private countIndent = 2;

  private widthGap = 0;

  private countLines = 10;

  public heigthOfLine = 40;

  public moveXCurrentPosition = 0;

  public moveXPositions: number[] = [];

  public moveYCurrentPosition = 0;

  public moveYPositions: number[] = [];

  constructor() {
    const img = new Image();
    img.src = `src/app/data/images/${this.mainPicture}`;
    this.heigthOfLine = ((this.widthPicture / img.width) * img.height) / this.countLines || this.heigthOfLine;
    this.positionsCards();
    this.setMainPicture();
  }

  public currentPhrase(index: number = this.currentIndexPicture): string {
    return DataServise.dataRounds[this.currentIndexPicture].words[index].textExample;
  }

  public currentMainPicture(index: number = this.currentIndexPicture): string {
    return DataServise.dataRounds[index].levelData.imageSrc;
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

  public setMainPicture(): void {
    this.mainPicture = DataServise.dataRounds[this.currentIndexPicture].levelData.imageSrc;
  }

  public numWordsInPhrase(indexPhrase: number = this.currentIndexPhrase): number {
    return DataServise.dataRounds[this.currentIndexPicture].words[indexPhrase].textExample.split(' ').length;
  }

  public numSymbolsInPhrase(indexPhrase: number = this.currentIndexPhrase): number {
    return DataServise.dataRounds[this.currentIndexPicture].words[indexPhrase].textExample.split(' ').join('').length;
  }

  public positionsCards = (): void => {
    const arrayWordsOfPhrase = this.currentPhrase(this.currentIndexPhrase).split(' ');
    const resultXPositions: number[] = [];
    const resultYPositions: number[] = [];
    for (let i = 0; i < arrayWordsOfPhrase.length; i += 1) {
      resultXPositions.push(this.moveXCurrentPosition);
      this.moveXCurrentPosition += this.widthCard(arrayWordsOfPhrase[i]);
    }
    this.moveXPositions = resultXPositions;
    for (let i = 0; i < this.countLines; i += 1) {
      resultYPositions.push(this.moveYCurrentPosition);
      this.moveYCurrentPosition += this.heigthOfLine;
    }
    this.moveYPositions = resultYPositions;
  };

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
