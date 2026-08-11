import { updatePlayer } from "./updatePlayer.js";
import type { StartedGame } from "../types/Game.js";

export function raiseScore(
  game: StartedGame,
  playerId: string,
  points: number,
): StartedGame {
  return updatePlayer(game, playerId, (p) => ({
    ...p,
    score: p.score + points,
  }));
}
