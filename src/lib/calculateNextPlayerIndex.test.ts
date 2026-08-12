import { expect, test } from "vitest";
import { calculateNextPlayerIndex } from "./calculateNextPlayerIndex.js";

test("defaults to forward direction with wrapping", () => {
  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 0,
    }),
  ).toBe(1);

  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 1,
    }),
  ).toBe(2);

  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 2,
    }),
  ).toBe(0);
});

test("changes turn in forward direction with wrapping", () => {
  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 0,
      isReversed: false,
    }),
  ).toBe(1);

  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 1,
      isReversed: false,
    }),
  ).toBe(2);

  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 2,
      isReversed: false,
    }),
  ).toBe(0);
});

test("changes turn in reverse direction with wrapping", () => {
  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 0,
      isReversed: true,
    }),
  ).toBe(2);

  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 2,
      isReversed: true,
    }),
  ).toBe(1);

  expect(
    calculateNextPlayerIndex({
      players: [{}, {}, {}],
      currentPlayerIndex: 1,
      isReversed: true,
    }),
  ).toBe(0);
});
