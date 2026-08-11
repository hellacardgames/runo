import { ACTION_CARD_VALUE, WILD_CARD_VALUE } from "../constants.js";
import type { Card } from "../types/Card.js";

export function getPointsForCard(card: Card): number {
  switch (card.type) {
    case "number":
      return card.value;
    case "drawTwo":
    case "reverse":
    case "skip":
      return ACTION_CARD_VALUE;
    case "wild":
      return WILD_CARD_VALUE;
  }
}
