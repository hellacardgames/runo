import { expect, test } from "vitest";
import { changeTurn } from "./changeTurn.js";

test("defaults to forward direction with wrapping", () => {
  let game = {
    players: [{}, {}, {}],
    currentPlayerIndex: 0,
  };
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(1);
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(2);
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(0);
});

test("changes turn in forward direction with wrapping", () => {
  let game = {
    players: [{}, {}, {}],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(1);
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(2);
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(0);
});

test("changes turn in reverse direction with wrapping", () => {
  let game = {
    players: [{}, {}, {}],
    currentPlayerIndex: 0,
    isReversed: true,
  };
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(2);
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(1);
  game = changeTurn(game);
  expect(game.currentPlayerIndex).toBe(0);
});
