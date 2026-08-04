import { shuffle } from "./shuffle.js";
import { discardFirstCard } from "./discardFirstCard.js";
import { dealCardsToPlayers } from "./dealCardsToPlayers.js";
import { emitEvent } from "./emitEvent.js";
import { INITIAL_HAND_SIZE } from "../constants.js";
import type { StartedGame } from "../types/Game.js";

export function startRound(game: StartedGame): StartedGame {
  game = { ...game, drawPile: shuffle(game.drawPile) };
  game = dealCardsToPlayers(game, INITIAL_HAND_SIZE);
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
