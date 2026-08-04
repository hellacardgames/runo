import { expect, test } from "vitest";
import { hasPlayableCard } from "./hasPlayableCard.js";
import type { Card, DiscardedCard } from "../types/Card.js";

test("returns true when at least one card is playable", () => {
  const hand: Card[] = [
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "green", id: "card-id-002" },
    { type: "number", value: 1, color: "blue", id: "card-id-003" },
  ];

  const discardPile: DiscardedCard[] = [
    { type: "number", value: 5, color: "red", id: "card-id-004" },
  ];

  expect(hasPlayableCard(hand, discardPile)).toBe(true);
});

test("returns false when no card is playable", () => {
  const hand: Card[] = [
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "green", id: "card-id-002" },
    { type: "number", value: 1, color: "blue", id: "card-id-003" },
  ];

  const discardPile: DiscardedCard[] = [
    { type: "number", value: 5, color: "yellow", id: "card-id-004" },
  ];

  expect(hasPlayableCard(hand, discardPile)).toBe(false);
});
