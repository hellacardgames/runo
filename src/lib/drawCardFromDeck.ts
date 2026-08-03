import { shuffle } from "./shuffle.js";
import type { Card } from "../types/Card.js";
import type { Game } from "../types/Game.js";

export function drawCardFromDrawPile(game: Game): Card {
  if (game.drawPile.length === 0) {
    const discardsToReturn = game.discardPile.splice(
      0,
      game.discardPile.length - 1,
    );
    game.drawPile.push(
      ...discardsToReturn.map((c) => {
        if (c.type === "discardedWild") {
          return c.card;
        }
        return c;
      }),
    );
    shuffle(game.drawPile);
  }
  const card = game.drawPile.pop();
  if (!card) {
    throw new Error("Ran out of cards while drawing.");
  }
  return card;
}
