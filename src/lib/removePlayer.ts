import { changeTurn } from "./changeTurn.js";
import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

export function removePlayer(game: Game, player: Player): void {
  const index = game.players.indexOf(player);
  if (index === -1) {
    return;
  }
  if (index === game.currentPlayerIndex) {
    changeTurn(game);
  }
  game.players.splice(index, 1);
  if (game.currentPlayerIndex > index) {
    game.currentPlayerIndex--;
  }
}
