import { emitEvent } from "./emitEvent.js";
import type { Game } from "../types/Game.js";

export function changeTurn(game: Game) {
  if (game.isReversed) {
    game.currentPlayerIndex =
      (game.currentPlayerIndex + game.players.length - 1) % game.players.length;
  } else {
    game.currentPlayerIndex =
      (game.currentPlayerIndex + 1) % game.players.length;
  }
  emitEvent(game, {
    type: "turnChanged",
    currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
  });
}
