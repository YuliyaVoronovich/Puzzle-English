import type { IGameRound } from '../interfaces/gameRound';
import type { IRound } from '../interfaces/round';

const dataRoundOneLevel: unknown = await import('../data/wordCollectionLevel1.json');
const dataRoundTwoLevel: unknown = await import('../data/wordCollectionLevel2.json');
const dataRoundThreeLevel: unknown = await import('../data/wordCollectionLevel3.json');
const dataRoundFourLevel: unknown = await import('../data/wordCollectionLevel4.json');
const dataRoundFiveLevel: unknown = await import('../data/wordCollectionLevel5.json');
const dataRoundSixLevel: unknown = await import('../data/wordCollectionLevel6.json');

class Data {
  private rounds: IRound[] = [];

  private roundsCount = 0;
  // eslint-disable-next-line
  public dataRounds(level: number): IRound[] {
    if (
      this.isData(dataRoundOneLevel) &&
      this.isData(dataRoundTwoLevel) &&
      this.isData(dataRoundThreeLevel) &&
      this.isData(dataRoundFourLevel) &&
      this.isData(dataRoundFiveLevel) &&
      this.isData(dataRoundSixLevel)
    ) {
      switch (level) {
        case 1: {
          this.rounds = dataRoundOneLevel.rounds;
          this.roundsCount = dataRoundOneLevel.roundsCount;
          break;
        }
        case 2: {
          this.rounds = dataRoundTwoLevel.rounds;
          this.roundsCount = dataRoundTwoLevel.roundsCount;
          break;
        }
        case 3: {
          this.rounds = dataRoundThreeLevel.rounds;
          this.roundsCount = dataRoundThreeLevel.roundsCount;
          break;
        }
        case 4: {
          this.rounds = dataRoundFourLevel.rounds;
          this.roundsCount = dataRoundFourLevel.roundsCount;
          break;
        }
        case 5: {
          this.rounds = dataRoundFiveLevel.rounds;
          this.roundsCount = dataRoundFiveLevel.roundsCount;
          break;
        }
        case 6: {
          this.rounds = dataRoundSixLevel.rounds;
          this.roundsCount = dataRoundSixLevel.roundsCount;
          break;
        }
        default:
          this.rounds = dataRoundOneLevel.rounds;
          this.roundsCount = dataRoundOneLevel.roundsCount;
          break;
      }
    }
    return this.rounds;
  }

  public dataRoundsCount(): number {
    return this.roundsCount;
  }

  private isData(value: unknown): value is IGameRound {
    return value !== null && value !== undefined;
  }
}
export const DataService = new Data();
