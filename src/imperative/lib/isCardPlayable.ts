import type { Card, Color, DiscardedCard } from "../types/Card.js";

export function isCardPlayable(
  card: Card,
  hand: readonly Card[],
  discardPile: readonly DiscardedCard[],
): boolean {
  const lastDiscard = discardPile[discardPile.length - 1];
  if (!lastDiscard) {
    throw new Error("Discard pile is empty.");
  }
  if (card.type === "wild") {
    if (card.isDrawFour) {
      if (hasCardOfColor(lastDiscard.color, hand)) {
        return false;
      }
      return true;
    } else {
      return true;
    }
  }
  if (card.color === lastDiscard.color) {
    return true;
  }
  if (card.type === "number" && lastDiscard.type === "number") {
    return card.value === lastDiscard.value;
  }
  return card.type === lastDiscard.type;
}

function hasCardOfColor(color: Color, hand: readonly Card[]): boolean {
  return !!hand.find((c) => c.type !== "wild" && c.color === color);
}
