import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { updateGame } from "./updateGame.js";
import type { Game } from "../types/Game.js";

test("updates game properties", () => {
  let game: Game = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "created",
    players: [],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = updateGame(game, {
    expiresAt: 555,
    players: [
      {
        id: "player-id-001",
        userId: "user-id-001",
        username: "username-001",
        events: [],
        hand: [],
        score: 0,
      },
    ],
    drawPile: [{ type: "number", value: 1, color: "blue", id: "card-id-001" }],
    discardPile: [{ type: "drawTwo", color: "yellow", id: "card-id-002" }],
    currentPlayerIndex: 1,
    isReversed: true,
  });

  expect(game.expiresAt).toBe(555);
  expect(game.drawPile).toEqual([
    { type: "number", value: 1, color: "blue", id: "card-id-001" },
  ]);
  expect(game.discardPile).toEqual([
    { type: "drawTwo", color: "yellow", id: "card-id-002" },
  ]);
  expect(game.currentPlayerIndex).toBe(1);
  expect(game.isReversed).toBe(true);
});
