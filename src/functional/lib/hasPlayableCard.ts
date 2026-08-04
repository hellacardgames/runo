import { isCardPlayable } from "./isCardPlayable.js";
import type { Card, DiscardedCard } from "../types/Card.js";

export function hasPlayableCard(
  hand: readonly Card[],
  discardPile: readonly DiscardedCard[],
) {
  for (const card of hand) {
    if (isCardPlayable(card, hand, discardPile)) {
      return true;
    }
  }
  return false;
}
