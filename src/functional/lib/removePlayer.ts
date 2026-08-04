import { changeTurn } from "./changeTurn.js";

type RemovePlayerResult<Game extends TurnBasedGame<Player>, Player> = {
  readonly turnChanged: boolean;
  readonly game: Game;
};

type TurnBasedGame<Player> = {
  readonly players: readonly Player[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export function removePlayer<Game extends TurnBasedGame<Player>, Player>(
  game: Game,
  player: Player,
): RemovePlayerResult<Game, Player> {
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
