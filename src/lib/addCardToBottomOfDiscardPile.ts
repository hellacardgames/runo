import { prependItemToCollection } from "./prependItemToCollection.js";
import type { Card, WildCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function addCardToBottomOfDiscardPile(
  game: StartedGame,
  card: Exclude<Card, WildCard>,
): StartedGame {
  return {
    ...game,
    discardPile: prependItemToCollection(game.discardPile, card),
  };
}
