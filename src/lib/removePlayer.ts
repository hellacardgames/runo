import { changeTurn } from "./changeTurn.js";

type RemovePlayerResult = {
  readonly playerRemoved: boolean;
  readonly turnChanged: boolean;
};

export function removePlayer<
  Game extends {
    currentPlayerIndex: number;
    isReversed: boolean;
    players: Player[];
  },
  Player,
>(game: Game, player: Player): RemovePlayerResult {
  let playerRemoved = false;
  let turnChanged = false;
  const index = game.players.indexOf(player);
  if (index === -1) {
    return { playerRemoved, turnChanged };
  }
  if (index === game.currentPlayerIndex) {
    changeTurn(game);
    turnChanged = true;
  }
  game.players.splice(index, 1);
  if (game.currentPlayerIndex > index) {
    game.currentPlayerIndex--;
  }
  playerRemoved = true;
  return { playerRemoved, turnChanged };
}
