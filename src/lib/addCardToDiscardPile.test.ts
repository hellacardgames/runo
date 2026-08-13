import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { addCardToDiscardPile } from "./addCardToDiscardPile.js";
import type { StartedGame } from "../types/Game.js";

test("adds card to discard pile", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      { id: "card-id-001", type: "number", value: 1, color: "red" },
      { id: "card-id-002", type: "number", value: 1, color: "green" },
      { id: "card-id-003", type: "number", value: 1, color: "blue" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  game = addCardToDiscardPile(game, {
    id: "card-id-004",
    type: "number",
    value: 1,
    color: "yellow",
  });

  expect(game.discardPile).toEqual([
    { id: "card-id-001", type: "number", value: 1, color: "red" },
    { id: "card-id-002", type: "number", value: 1, color: "green" },
    { id: "card-id-003", type: "number", value: 1, color: "blue" },
    { id: "card-id-004", type: "number", value: 1, color: "yellow" },
  ]);
});
