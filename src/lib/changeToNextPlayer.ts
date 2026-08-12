import { changeTurn, emitEvent, getCurrentPlayer } from "@hellacardgames/lib";
import type { StartedGame } from "../types/Game.js";

export function changeToNextPlayer(game: StartedGame): StartedGame {
  game = changeTurn(game);

  game = emitEvent(game, {
    type: "turnChanged",
    currentPlayerUsername: getCurrentPlayer(game).username,
  });

  return game;
}
