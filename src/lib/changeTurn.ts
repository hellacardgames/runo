// import { emitEvent } from "../../../lib";
import type { Game } from "../types/Game.js";

export function changeTurn(game: Game) {
  game.playerList.advance();
  // emitEvent(game, {
  //   type: "turnChanged",
  //   currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
  // });
}
