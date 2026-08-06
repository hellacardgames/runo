import { addItemToCollection } from "./addItemToCollection.js";
import type { Card, WildCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function addCardToDiscardPile(
  game: StartedGame,
  card: Exclude<Card, WildCard>,
): StartedGame {
  return {
    ...game,
    discardPile: addItemToCollection(game.discardPile, card),
  };
}
