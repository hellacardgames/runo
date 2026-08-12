import { emitEvent } from "./emitEvent.js";
import type { StartedGame } from "../types/Game.js";

export function changeDirection(game: StartedGame): StartedGame {
  const isReversed = !game.isReversed;

  game = { ...game, isReversed };
  game = emitEvent(game, { type: "directionChanged", isReversed });

  return game;
}
