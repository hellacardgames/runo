import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { takeCardFromDrawPile } from "./takeCardFromDrawPile.js";
import type { StartedGame } from "../types/Game.js";

test("takes a card from top of the draw pile", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  const result = takeCardFromDrawPile(game);
  game = result.game;
  const { card } = result;
  expect(card).toEqual({
    type: "number",
    value: 1,
    color: "red",
    id: "card-id-003",
  });
  expect(game.drawPile).toHaveLength(2);
});

test("replenishes draw pile if needed", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
      { type: "number", value: 1, color: "red", id: "card-id-004" },
      { type: "number", value: 1, color: "red", id: "card-id-005" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  const result = takeCardFromDrawPile(game);
  game = result.game;
  expect(game.drawPile).toHaveLength(3);
});

test("throws error if draw pile is empty even after replenishing", () => {
  const game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  expect(() => takeCardFromDrawPile(game)).toThrow("Draw pile is empty.");
});
