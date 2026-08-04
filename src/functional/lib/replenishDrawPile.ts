import { shuffle } from "./shuffle.js";
import type { StartedGame } from "../types/Game.js";

export function replenishDrawPile(game: StartedGame): StartedGame {
  const discardPile = [...game.discardPile];

  const drawPile = discardPile
    .splice(0, discardPile.length - 1)
    .map((discardedCard) => {
      if (discardedCard.type === "discardedWild") {
        return discardedCard.card;
      }
      return discardedCard;
    });

  return {
    ...game,
    drawPile: shuffle(drawPile),
    discardPile,
  };
}
