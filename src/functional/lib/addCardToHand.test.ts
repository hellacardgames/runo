import { expect, test } from "vitest";
import { addCardToHand } from "./addCardToHand.js";

test("adds card to hand", () => {
  const cardToAdd = { id: "card-id-003" };
  let player = {
    hand: [{ id: "card-id-001" }, { id: "card-id-002" }],
  };

  player = addCardToHand(player, cardToAdd);

  expect(player.hand).toEqual([
    { id: "card-id-001" },
    { id: "card-id-002" },
    { id: "card-id-003" },
  ]);
});
