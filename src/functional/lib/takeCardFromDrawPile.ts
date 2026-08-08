import { replenishDrawPile } from "./replenishDrawPile.js";
import { takeLastItemFromCollection } from "./takeLastItemFromCollection.js";
import type { Card } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

type Result = {
  card: Card;
  game: StartedGame;
};

export function takeCardFromDrawPile(game: StartedGame): Result {
  if (game.drawPile.length === 0) {
    game = replenishDrawPile(game);
  }

  const { collection: newDrawPile, item: card } = takeLastItemFromCollection(
    game.drawPile,
  );

  game = { ...game, drawPile: newDrawPile };

  return { card, game };
}
