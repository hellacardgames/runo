import { shuffle } from "./shuffle.js";
import { discardFirstCard } from "./discardFirstCard.js";
import { dealCardsToPlayers } from "./dealCardsToPlayers.js";
import { changeDirection } from "./changeDirection.js";
import type { StartedGame } from "../types/Game.js";

export function startRound(game: StartedGame): StartedGame {
  game = { ...game, drawPile: shuffle(game.drawPile) };
  game = dealCardsToPlayers(game);
  game = discardFirstCard(game);

  if (game.isReversed) {
    game = changeDirection(game);
  }

  return game;
}
