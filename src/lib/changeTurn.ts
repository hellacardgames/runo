import { calculateNextPlayerIndex } from "./calculateNextPlayerIndex.js";

type Game = {
  readonly players: readonly unknown[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export function changeTurn<TGame extends Game>(game: TGame): TGame {
  return {
    ...game,
    currentPlayerIndex: calculateNextPlayerIndex(game),
  };
}
