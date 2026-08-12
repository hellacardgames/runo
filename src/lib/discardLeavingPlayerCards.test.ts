import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { discardLeavingPlayerCards } from "./discardLeavingPlayerCards.js";
import type { Game } from "../types/Game.js";

test("discards player cards to bottom of discard pile", () => {
  let game: Game = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [
      {
        id: "player-id-001",
        userId: "user-id-001",
        username: "username-001",
        events: [],
        hand: [
          { type: "number", value: 1, color: "red", id: "card-id-001" },
          { type: "drawTwo", color: "red", id: "card-id-002" },
          { type: "wild", isDrawFour: false, id: "card-id-003" },
        ],
        score: 0,
      },
    ],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "green", id: "card-id-004" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = discardLeavingPlayerCards(game, "player-id-001");

  expect(game.discardPile).toEqual([
    expect.objectContaining({
      type: "discardedWild",
      card: { type: "wild", isDrawFour: false, id: "card-id-003" },
    }),
    { type: "drawTwo", color: "red", id: "card-id-002" },
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "green", id: "card-id-004" },
  ]);
});

test("throws if player does not exist in game", () => {
  const game: Game = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [
      {
        id: "player-id-001",
        userId: "user-id-001",
        username: "username-001",
        events: [],
        hand: [
          { type: "number", value: 1, color: "red", id: "card-id-001" },
          { type: "drawTwo", color: "red", id: "card-id-002" },
          { type: "wild", isDrawFour: false, id: "card-id-003" },
        ],
        score: 0,
      },
    ],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "green", id: "card-id-004" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  expect(() => discardLeavingPlayerCards(game, "some-random-id")).toThrow(
    "Player some-random-id does not exist in game.",
  );
});
