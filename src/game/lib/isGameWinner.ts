import { getPlayer } from "@hellacardgames/lib";
import { WINNING_SCORE } from "../constants.js";
import type { StartedGame } from "../types/Game.js";

export function isGameWinner(game: StartedGame, playerId: string): boolean {
  const { player } = getPlayer(game, playerId);

  return player.score >= WINNING_SCORE;
}
