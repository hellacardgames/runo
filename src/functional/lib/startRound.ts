import { shuffle } from "./shuffle.js";
import { discardFirstCard } from "./discardFirstCard.js";
import { dealCardsToPlayers } from "./dealCardsToPlayers.js";
import { emitEvent } from "./emitEvent.js";
import type { Game } from "../types/Game.js";

export function startRound(game: Game): Game {
  game = { ...game, drawPile: shuffle(game.drawPile) };
  game = dealCardsToPlayers(game);
  game = discardFirstCard(game);

  if (game.isReversed) {
    const isReversed = false;
    game = {
      ...emitEvent(game, { type: "directionChanged", isReversed }),
      isReversed,
    };
  }

  return game;
}
