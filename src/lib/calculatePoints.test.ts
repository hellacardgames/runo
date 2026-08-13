import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { calculatePoints } from "./calculatePoints.js";
import type { StartedGame } from "../types/Game.js";

test("returns correct points when players have cards", () => {
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
        hand: [
          { type: "number", value: 5, color: "red", id: "card-id-001" },
          { type: "number", value: 0, color: "red", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [
          { type: "drawTwo", color: "red", id: "card-id-003" },
          { type: "wild", isDrawFour: false, id: "card-id-004" },
          { type: "number", value: 9, color: "red", id: "card-id-005" },
        ],
        score: 0,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [
          { type: "number", value: 2, color: "red", id: "card-id-006" },
          { type: "number", value: 1, color: "red", id: "card-id-007" },
          { type: "reverse", color: "red", id: "card-id-008" },
          { type: "skip", color: "red", id: "card-id-009" },
        ],
        score: 0,
      },
    ],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  expect(calculatePoints(game)).toBe(127);
});

test("returns zero when players have no cards", () => {
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
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
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

  expect(calculatePoints(game)).toBe(0);
});

test("returns zero when there are no players", () => {
  const game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  expect(calculatePoints(game)).toBe(0);
});
