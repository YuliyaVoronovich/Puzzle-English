import type { ILevelData } from './levelData';
import type { IPhrase } from './phrase';

export interface IRound {
  levelData: ILevelData;
  words: IPhrase[];
}
