import { changeTurn } from "./changeTurn.js";

type RemovePlayerResult<Game extends TurnBasedGame<Player>, Player> = {
  readonly playerRemoved: boolean;
  readonly turnChanged: boolean;
  readonly game: Game;
};

type TurnBasedGame<Player> = {
  readonly players: readonly Player[];
  readonly currentPlayerIndex: number;
};

export function removePlayer<Game extends TurnBasedGame<Player>, Player>(
  game: Game,
  player: Player,
): RemovePlayerResult<Game, Player> {
  let turnChanged = false;

  const index = game.players.indexOf(player);
  if (index === -1) {
    return { playerRemoved: false, turnChanged, game };
  }

  if (index === game.currentPlayerIndex) {
    game = changeTurn(game);
    turnChanged = true;
  }

  game = { ...game, players: game.players.filter((_, i) => i !== index) };

  if (game.currentPlayerIndex > index) {
    game = { ...game, currentPlayerIndex: game.currentPlayerIndex + 1 };
  }

  return { playerRemoved: true, turnChanged, game };
}
