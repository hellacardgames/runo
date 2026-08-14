import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { takeCardsFromDrawPile } from "./takeCardsFromDrawPile.js";
import type { StartedGame } from "../types/Game.js";

test("takes cards from top of the draw pile", () => {
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
    chatMessages: [],
  };
  const result = takeCardsFromDrawPile(game, 2);
  game = result.game;
  const { cards } = result;
  expect(cards).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
  ]);
  expect(game.drawPile).toHaveLength(1);
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
    chatMessages: [],
  };
  const result = takeCardsFromDrawPile(game, 2);
  game = result.game;
  expect(game.drawPile).toHaveLength(2);
});
