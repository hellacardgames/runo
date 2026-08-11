import { requirePlayer } from "./requirePlayer.js";
import type { StartedGame } from "../types/Game.js";

export function isOutOfCards(game: StartedGame, playerId: string): boolean {
  const { player } = requirePlayer(game, playerId);

  return player.hand.length === 0;
}
