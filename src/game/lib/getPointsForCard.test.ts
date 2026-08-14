import { expect, test } from "vitest";
import { getPointsForCard } from "./getPointsForCard.js";
import { ACTION_CARD_VALUE, WILD_CARD_VALUE } from "../constants.js";

test("returns correct points for number cards", () => {
  expect(
    getPointsForCard({
      type: "number",
      value: 4,
      color: "red",
      id: "card-id-001",
    }),
  ).toBe(4);

  expect(
    getPointsForCard({
      type: "number",
      value: 7,
      color: "red",
      id: "card-id-001",
    }),
  ).toBe(7);

  expect(
    getPointsForCard({
      type: "number",
      value: 0,
      color: "red",
      id: "card-id-001",
    }),
  ).toBe(0);

  expect(
    getPointsForCard({
      type: "number",
      value: 1,
      color: "red",
      id: "card-id-001",
    }),
  ).toBe(1);
});

test("returns correct points for action cards", () => {
  expect(
    getPointsForCard({ type: "drawTwo", color: "red", id: "card-id-001" }),
  ).toBe(ACTION_CARD_VALUE);

  expect(
    getPointsForCard({ type: "reverse", color: "red", id: "card-id-001" }),
  ).toBe(ACTION_CARD_VALUE);

  expect(
    getPointsForCard({ type: "skip", color: "red", id: "card-id-001" }),
  ).toBe(ACTION_CARD_VALUE);
});

test("returns correct points for wild cards", () => {
  expect(
    getPointsForCard({ type: "wild", isDrawFour: false, id: "card-id-001" }),
  ).toBe(WILD_CARD_VALUE);

  expect(
    getPointsForCard({ type: "wild", isDrawFour: true, id: "card-id-001" }),
  ).toBe(WILD_CARD_VALUE);
});
