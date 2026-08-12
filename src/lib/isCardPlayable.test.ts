import { expect, test } from "vitest";
import { isCardPlayable } from "./isCardPlayable.js";
import type { Card, DiscardedCard } from "../types/Card.js";

test("card with same number but different color is playable", () => {
  const card: Card = { id: "###", type: "number", color: "blue", value: 5 };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "number", color: "red", value: 5 },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(true);
});

test("card with different number but same color is playable", () => {
  const card: Card = { id: "###", type: "number", color: "blue", value: 5 };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "number", color: "blue", value: 8 },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(true);
});

test("card with different number and different color not playable", () => {
  const card: Card = { id: "###", type: "number", color: "blue", value: 5 };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "number", color: "red", value: 7 },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(false);
});

test("card with same action but different color is playable", () => {
  const card: Card = { id: "###", type: "drawTwo", color: "blue" };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "drawTwo", color: "green" },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(true);
});

test("card with different action and different color not playable", () => {
  const card: Card = { id: "###", type: "drawTwo", color: "blue" };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "reverse", color: "green" },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(false);
});

test("card with same color is playable regardless of type", () => {
  const card: Card = { id: "###", type: "number", color: "blue", value: 3 };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "drawTwo", color: "blue" },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(true);
});

test("regular wild card is always playable", () => {
  const card: Card = { id: "###", type: "wild", isDrawFour: false };
  const hand: readonly Card[] = [
    { id: "###", type: "number", color: "green", value: 3 },
    { id: "###", type: "number", color: "red", value: 3 },
    { id: "###", type: "number", color: "yellow", value: 3 },
    { id: "###", type: "number", color: "blue", value: 3 },
  ];
  const discardPiles: DiscardedCard[][] = [
    [{ id: "###", type: "number", color: "red", value: 5 }],
    [{ id: "###", type: "drawTwo", color: "blue" }],
    [{ id: "###", type: "reverse", color: "yellow" }],
    [{ id: "###", type: "skip", color: "green" }],
    [
      {
        type: "discardedWild",
        color: "blue",
        card: { id: "###", type: "wild", isDrawFour: false },
      },
    ],
  ];
  for (const discardPile of discardPiles) {
    expect(isCardPlayable(card, hand, discardPile)).toBe(true);
  }
});

test("wild draw four not playable if player has matching color", () => {
  const card: Card = { id: "###", type: "wild", isDrawFour: true };
  const hand: readonly Card[] = [
    { id: "###", type: "number", color: "blue", value: 3 },
  ];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "drawTwo", color: "blue" },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(false);
});

test("wild draw four is playable if player does not have matching color", () => {
  const card: Card = { id: "###", type: "wild", isDrawFour: true };
  const hand: readonly Card[] = [
    { id: "###", type: "number", color: "blue", value: 3 },
  ];
  const discardPile: readonly DiscardedCard[] = [
    { id: "###", type: "drawTwo", color: "red" },
  ];
  expect(isCardPlayable(card, hand, discardPile)).toBe(true);
});

test("throws error if discard pile is empty", () => {
  const card: Card = { id: "###", type: "number", color: "blue", value: 5 };
  const hand: readonly Card[] = [];
  const discardPile: readonly DiscardedCard[] = [];
  expect(() => isCardPlayable(card, hand, discardPile)).toThrow(
    "Discard pile is empty.",
  );
});
