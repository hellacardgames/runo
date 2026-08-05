import { getCurrentPlayer } from "./getCurrentPlayer.js";
import { requirePlayer } from "./requirePlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
  readonly currentPlayerIndex: number;
};

export function isCurrentPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): boolean {
  requirePlayer(game, playerId);
  return getCurrentPlayer(game).id === playerId;
}
