import { INITIAL_HAND_SIZE } from "../constants.js";
import { emitEventToPlayer } from "./emitEventToPlayer.js";
import { emitEvent } from "./emitEvent.js";
import { shuffle } from "./shuffle.js";
import type { Game } from "../types/Game.js";

export function startRound(game: Game): void {
  shuffle(game.drawPile);
  for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
    for (const p of game.players) {
      const card = game.drawPile.pop();
      if (!card) {
        throw new Error("Ran out of cards while dealing to players.");
      }
      p.hand.push(card);
      emitEventToPlayer(p, { type: "cardDealt", card });
      emitEvent(game, { type: "cardDealtToPlayer", username: p.username });
    }
  }
  let firstDiscard = game.drawPile.pop();
  if (firstDiscard === undefined) {
    throw new Error("Ran out of cards while picking first card to discard.");
  }
  while (firstDiscard.type !== "number") {
    game.drawPile.unshift(firstDiscard);
    firstDiscard = game.drawPile.pop();
    if (firstDiscard === undefined) {
      throw new Error("Ran out of cards while picking first card to discard.");
    }
  }
  game.discardPile.push(firstDiscard);
  emitEvent(game, { type: "cardDiscarded", card: firstDiscard });
  if (game.isReversed) {
    game.isReversed = false;
    emitEvent(game, { type: "directionChanged", isReversed: game.isReversed });
  }
}
