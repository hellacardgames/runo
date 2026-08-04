import { emitEvent } from "./emitEvent.js";
import type { StartedGame } from "../types/Game.js";

export function discardFirstCard(game: StartedGame): StartedGame {
  const drawPile = [...game.drawPile];

  let firstDiscard = drawPile.pop();
  if (!firstDiscard) {
    throw new Error("Ran out of cards while picking first card to discard.");
  }

  while (firstDiscard.type !== "number") {
    drawPile.unshift(firstDiscard);
    firstDiscard = drawPile.pop();
    if (!firstDiscard) {
      throw new Error("Ran out of cards while picking first card to discard.");
    }
  }

  game = { ...game, drawPile, discardPile: [firstDiscard] };
  game = emitEvent(game, { type: "cardDiscarded", card: firstDiscard });

  return game;
}
