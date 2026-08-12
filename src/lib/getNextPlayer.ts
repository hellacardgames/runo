import { calculateNextPlayerIndex } from "./calculateNextPlayerIndex.js";

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly unknown[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export function getNextPlayer<TGame extends Game>(game: TGame): Player<TGame> {
  const nextPlayerIndex = calculateNextPlayerIndex(game);
  const nextPlayer = game.players[nextPlayerIndex];
  if (!nextPlayer) {
    throw new Error(`Next player not found.`);
  }
  return nextPlayer;
}
