import { changeTurn } from "./changeTurn.js";
import { emitEvent } from "./emitEvent.js";
import { getCurrentPlayer } from "./getCurrentPlayer.js";
import type { StartedGame } from "../types/Game.js";

export function changeToNextPlayer(game: StartedGame): StartedGame {
  game = changeTurn(game);

  game = emitEvent(game, {
    type: "turnChanged",
    currentPlayerUsername: getCurrentPlayer(game).username,
  });

  return game;
}
