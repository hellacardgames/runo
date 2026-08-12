import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { raiseScore } from "./raiseScore.js";
import type { StartedGame } from "../types/Game.js";

test("raises player score", () => {
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
        score: 56,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: 123,
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

  game = raiseScore(game, "player-id-002", 129);

  expect(game.players[1]!.score).toBe(252);
});

test("does not raise other player scores", () => {
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
        score: 56,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [],
        score: 123,
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

  game = raiseScore(game, "player-id-002", 129);

  expect(game.players[0]!.score).toBe(56);
  expect(game.players[2]!.score).toBe(11);
});
