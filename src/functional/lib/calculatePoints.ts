import { getPointsForCard } from "./getPointsForCard.js";
import type { StartedGame } from "../types/Game.js";

export function calculatePoints(game: StartedGame): number {
  return game.players
    .flatMap((p) => p.hand)
    .map((card) => getPointsForCard(card))
    .reduce(
      (previousPoints, currentPoints) => previousPoints + currentPoints,
      0,
    );
}
