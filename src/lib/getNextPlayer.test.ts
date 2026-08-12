import { expect, test } from "vitest";
import { getNextPlayer } from "./getNextPlayer.js";

test("defaults to forward direction", () => {
  const player1 = {};
  const player2 = {};
  const player3 = {};

  const game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 1,
  };

  expect(getNextPlayer(game)).toBe(player3);
});

test("returns the next player with forward wrapping", () => {
  const player1 = {};
  const player2 = {};
  const player3 = {};

  const game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 2,
    isReversed: false,
  };

  expect(getNextPlayer(game)).toBe(player1);
});

test("returns the next player with reverse wrapping", () => {
  const player1 = {};
  const player2 = {};
  const player3 = {};

  const game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
    isReversed: true,
  };

  expect(getNextPlayer(game)).toBe(player3);
});

test("throws when next player index does not exist", () => {
  const game = {
    players: [{}, {}, null],
    currentPlayerIndex: 1,
  };

  expect(() => getNextPlayer(game)).toThrow("Next player not found.");
});
