import { takeCardFromDrawPile } from "./takeCardFromDrawPile.js";
import type { Card } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

type TakeCardsFromDrawPileResult = {
  readonly cards: readonly Card[];
  readonly game: StartedGame;
};

export function takeCardsFromDrawPile(
  game: StartedGame,
  count: number,
): TakeCardsFromDrawPileResult {
  const cards: Card[] = [];

  for (let i = 0; i < count; i++) {
    const result = takeCardFromDrawPile(game);
    game = result.game;
    cards.push(result.card);
  }

  return { cards, game };
}
