import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { changeDirection } from "./changeDirection.js";
import type { StartedGame } from "../types/Game.js";

test("changes direction to reverse and emits directionChanged event to all players", () => {
  let game: StartedGame = {
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
        hand: [],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: 0,
      },
    ],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  game = changeDirection(game);

  expect(game.isReversed).toBe(true);

  expect(game.players[0]?.events).toEqual([
    expect.objectContaining({ type: "directionChanged", isReversed: true }),
  ]);

  expect(game.players[1]?.events).toEqual([
    expect.objectContaining({ type: "directionChanged", isReversed: true }),
  ]);
});

test("changes direction to forward and emits directionChanged event to all players", () => {
  let game: StartedGame = {
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
        hand: [],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: 0,
      },
    ],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: true,
    chatMessages: [],
  };

  game = changeDirection(game);

  expect(game.isReversed).toBe(false);

  expect(game.players[0]?.events).toEqual([
    expect.objectContaining({ type: "directionChanged", isReversed: false }),
  ]);

  expect(game.players[1]?.events).toEqual([
    expect.objectContaining({ type: "directionChanged", isReversed: false }),
  ]);
});
