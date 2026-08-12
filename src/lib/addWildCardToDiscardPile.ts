import { addItemToCollection } from "@hellacardgames/lib";
import type { Color, WildCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function addWildCardToDiscardPile(
  game: StartedGame,
  card: WildCard,
  color: Color,
): StartedGame {
  return {
    ...game,
    discardPile: addItemToCollection(game.discardPile, {
      type: "discardedWild",
      card,
      color,
    }),
  };
}
