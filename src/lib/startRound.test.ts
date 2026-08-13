import { expect, test, vi } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";

vi.mock(import("@hellacardgames/lib"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    shuffle: <T>(cards: readonly T[]) => [...cards].reverse(),
  };
});

import { startRound } from "./startRound.js";
import type { StartedGame } from "../types/Game.js";

test("shuffles and discards first card", () => {
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

  game = startRound(game);

  expect(game.discardPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
  ]);

  expect(game.drawPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
  ]);
});

test("deals cards to players", () => {
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
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
      { type: "number", value: 1, color: "red", id: "card-id-004" },
      { type: "number", value: 1, color: "red", id: "card-id-005" },
      { type: "number", value: 1, color: "red", id: "card-id-006" },
      { type: "number", value: 1, color: "red", id: "card-id-007" },
      { type: "number", value: 1, color: "red", id: "card-id-008" },
      { type: "number", value: 1, color: "red", id: "card-id-009" },
      { type: "number", value: 1, color: "red", id: "card-id-010" },
      { type: "number", value: 1, color: "red", id: "card-id-011" },
      { type: "number", value: 1, color: "red", id: "card-id-012" },
      { type: "number", value: 1, color: "red", id: "card-id-013" },
      { type: "number", value: 1, color: "red", id: "card-id-014" },
      { type: "number", value: 1, color: "red", id: "card-id-015" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: true,
    chatMessages: [],
  };

  game = startRound(game);

  expect(game.players[0]?.hand).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-005" },
    { type: "number", value: 1, color: "red", id: "card-id-007" },
    { type: "number", value: 1, color: "red", id: "card-id-009" },
    { type: "number", value: 1, color: "red", id: "card-id-011" },
    { type: "number", value: 1, color: "red", id: "card-id-013" },
  ]);
});

test("restore normal direction if reversed and emit event to all players", () => {
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
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
      { type: "number", value: 1, color: "red", id: "card-id-004" },
      { type: "number", value: 1, color: "red", id: "card-id-005" },
      { type: "number", value: 1, color: "red", id: "card-id-006" },
      { type: "number", value: 1, color: "red", id: "card-id-007" },
      { type: "number", value: 1, color: "red", id: "card-id-008" },
      { type: "number", value: 1, color: "red", id: "card-id-009" },
      { type: "number", value: 1, color: "red", id: "card-id-010" },
      { type: "number", value: 1, color: "red", id: "card-id-011" },
      { type: "number", value: 1, color: "red", id: "card-id-012" },
      { type: "number", value: 1, color: "red", id: "card-id-013" },
      { type: "number", value: 1, color: "red", id: "card-id-014" },
      { type: "number", value: 1, color: "red", id: "card-id-015" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: true,
    chatMessages: [],
  };

  game = startRound(game);

  expect(game.isReversed).toBe(false);

  expect(game.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "directionChanged",
        isReversed: false,
      }),
    ]),
  );

  expect(game.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "directionChanged",
        isReversed: false,
      }),
    ]),
  );
});
