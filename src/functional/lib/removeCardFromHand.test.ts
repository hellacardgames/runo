import { expect, test } from "vitest";
import { removeCardFromHand } from "./removeCardFromHand.js";

test("removes card from hand", () => {
  const card1 = { id: "card-id-001" };
  const card2 = { id: "card-id-002" };
  const card3 = { id: "card-id-003" };

  let player = {
    hand: [card1, card2, card3],
  };

  player = removeCardFromHand(player, card2);

  expect(player.hand).toEqual([card1, card3]);
});

test("throws if card does not exist in hand", () => {
  const card1 = { id: "card-id-001" };
  const card2 = { id: "card-id-002" };
  const card3 = { id: "card-id-003" };

  const player = {
    hand: [card1, card2],
  };

  expect(() => removeCardFromHand(player, card3)).toThrow(
    "Card does not exist in hand.",
  );
});
