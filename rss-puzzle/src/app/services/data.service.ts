import type { IGameRound } from '../interfaces.ts/gameRound';
import type { IRound } from '../interfaces.ts/round';

const dataRound: unknown = await import('../data/wordCollectionLevel1.json');

class Data {
  private rounds: IRound[] = [];

  public get dataRounds(): IRound[] {
    if (Data.isData(dataRound)) {
      this.rounds = dataRound.rounds;
    }
    return this.rounds;
  }

  private static isData(value: unknown): value is IGameRound {
    return value !== null && value !== undefined;
  }
}
export const DataServise = new Data();
