import { prependItemToCollection } from "./prependItemToCollection.js";
import type { Color, WildCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function addWildCardToBottomOfDiscardPile(
  game: StartedGame,
  card: WildCard,
  color: Color,
): StartedGame {
  return {
    ...game,
    discardPile: prependItemToCollection(game.discardPile, {
      type: "discardedWild",
      card,
      color,
    }),
  };
}
