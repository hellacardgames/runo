import { prependItemToCollection } from "@hellacardgames/lib";
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
