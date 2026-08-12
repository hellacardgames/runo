import { WINNING_SCORE } from "../constants.js";
import { requirePlayer } from "./requirePlayer.js";
import type { StartedGame } from "../types/Game.js";

export function isGameWinner(game: StartedGame, playerId: string): boolean {
  const { player } = requirePlayer(game, playerId);

  return player.score >= WINNING_SCORE;
}
