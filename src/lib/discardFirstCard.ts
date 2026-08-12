import { emitEvent } from "./emitEvent.js";
import type { StartedGame } from "../types/Game.js";

export function discardFirstCard(game: StartedGame): StartedGame {
  const drawPile = [...game.drawPile];

  let firstDiscard = drawPile.pop();
  if (!firstDiscard) {
    throw new Error("Draw pile is empty.");
  }

  const skippedCards = [];

  while (firstDiscard.type !== "number") {
    skippedCards.unshift(firstDiscard);
    firstDiscard = drawPile.pop();
    if (!firstDiscard) {
      throw new Error("Draw pile has no number cards.");
    }
  }

  drawPile.unshift(...skippedCards);

  game = { ...game, drawPile, discardPile: [firstDiscard] };
  game = emitEvent(game, { type: "cardDiscarded", card: firstDiscard });

  return game;
}
