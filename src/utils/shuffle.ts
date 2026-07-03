import type { Card } from "../types/Card.js";

/**
 * Fisher-Yates algorithm (also known as the Knuth shuffle).
 */
export function shuffle(cards: Card[]): void {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j]!, cards[i]!];
  }
}
