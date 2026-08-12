import { changeTurn } from "./changeTurn.js";
import { removeItemFromCollection } from "./removeItemFromCollection.js";
import { requirePlayer } from "./requirePlayer.js";

type RemovePlayerResult<TGame extends Game> = {
  readonly turnChanged: boolean;
  readonly game: TGame;
};

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export function removePlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): RemovePlayerResult<TGame> {
  const { player, index } = requirePlayer(game, playerId);

  let turnChanged = false;

  if (index === game.currentPlayerIndex) {
    game = changeTurn(game);
    turnChanged = true;
  }

  game = { ...game, players: removeItemFromCollection(game.players, player) };

  if (game.currentPlayerIndex > index) {
    game = { ...game, currentPlayerIndex: game.currentPlayerIndex - 1 };
  }

  return { turnChanged, game };
}
