import { changeTurn } from "./changeTurn.js";

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
  player: TGame["players"][number],
): RemovePlayerResult<TGame> {
  let turnChanged = false;

  const playerIndex = game.players.indexOf(player);
  if (playerIndex === -1) {
    return { turnChanged, game };
  }

  if (playerIndex === game.currentPlayerIndex) {
    game = changeTurn(game);
    turnChanged = true;
  }

  game = { ...game, players: game.players.filter((_, i) => i !== playerIndex) };

  if (game.currentPlayerIndex > playerIndex) {
    game = { ...game, currentPlayerIndex: game.currentPlayerIndex - 1 };
  }

  return { turnChanged, game };
}
