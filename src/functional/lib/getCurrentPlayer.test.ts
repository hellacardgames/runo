import { expect, test } from "vitest";
import { getCurrentPlayer } from "./getCurrentPlayer.js";

test("returns the player at currentPlayerIndex", () => {
  const player1 = {};
  const player2 = {};

  const game = {
    players: [player1, player2],
    currentPlayerIndex: 1,
  };

  expect(getCurrentPlayer(game)).toBe(player2);
});

test("throws when current player index does not exist", () => {
  const game = {
    players: [{}, {}],
    currentPlayerIndex: 3,
  };

  expect(() => getCurrentPlayer(game)).toThrow("Current player not found.");
});
