import { replenishDrawPile } from "./replenishDrawPile.js";
import type { Card } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

type Result = {
  card: Card;
  game: StartedGame;
};

export function takeCardFromDrawPile(game: StartedGame): Result {
  if (game.drawPile.length === 0) {
    game = replenishDrawPile(game);
  }

  const card = game.drawPile[game.drawPile.length - 1];
  if (!card) {
    throw new Error("Draw pile is empty.");
  }

  game = { ...game, drawPile: game.drawPile.slice(0, -1) };

  return { card, game };
}
