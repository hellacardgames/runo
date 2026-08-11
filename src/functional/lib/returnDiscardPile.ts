import { emitEvent } from "./emitEvent.js";
import type { StartedGame } from "../types/Game.js";

export function returnDiscardPile(game: StartedGame): StartedGame {
  game = {
    ...game,
    drawPile: [
      ...game.drawPile,
      ...game.discardPile.map((discardedCard) =>
        discardedCard.type === "discardedWild"
          ? discardedCard.card
          : discardedCard,
      ),
    ],
    discardPile: [],
  };

  game = emitEvent(game, { type: "discardPileReturned" });

  return game;
}
