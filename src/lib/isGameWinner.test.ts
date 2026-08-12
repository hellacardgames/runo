import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS, WINNING_SCORE } from "../constants.js";
import { isGameWinner } from "./isGameWinner.js";
import type { StartedGame } from "../types/Game.js";

test("returns true when player has exactly enough points", () => {
  const game: StartedGame = {
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
        score: 56,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: WINNING_SCORE,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [],
        score: 11,
      },
    ],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  expect(isGameWinner(game, "player-id-002")).toBe(true);
});

test("returns true when player has more than enough points", () => {
  const game: StartedGame = {
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
        score: 56,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: WINNING_SCORE + 1,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [],
        score: 11,
      },
    ],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  expect(isGameWinner(game, "player-id-002")).toBe(true);
});

test("returns false when player does not have enough points", () => {
  const game: StartedGame = {
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
        score: 56,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: WINNING_SCORE - 1,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [],
        score: 11,
      },
    ],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  expect(isGameWinner(game, "player-id-002")).toBe(false);
});
