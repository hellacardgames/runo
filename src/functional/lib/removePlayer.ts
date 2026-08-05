import { changeTurn } from "./changeTurn.js";
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
  const { index } = requirePlayer(game, playerId);

  let turnChanged = false;

  if (index === game.currentPlayerIndex) {
    game = changeTurn(game);
    turnChanged = true;
  }

  game = { ...game, players: game.players.filter((_, i) => i !== index) };

  if (game.currentPlayerIndex > index) {
    game = { ...game, currentPlayerIndex: game.currentPlayerIndex - 1 };
  }

  return { turnChanged, game };
}
