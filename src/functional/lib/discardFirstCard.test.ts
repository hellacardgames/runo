import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { discardFirstCard } from "./discardFirstCard.js";
import type { StartedGame } from "../types/Game.js";

test("discards first card", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [{ type: "number", value: 1, color: "red", id: "card-id-001" }],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  game = discardFirstCard(game);
  expect(game.discardPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
  ]);
  expect(game.drawPile).toHaveLength(0);
});

test("skips cards that are not number cards", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "drawTwo", color: "red", id: "card-id-002" },
      { type: "reverse", color: "red", id: "card-id-003" },
      { type: "skip", color: "red", id: "card-id-004" },
      { type: "wild", isDrawFour: false, id: "card-id-005" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  game = discardFirstCard(game);
  expect(game.discardPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
  ]);
  expect(game.drawPile).toHaveLength(4);
});

test("throws when draw pile is empty", () => {
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
  };
  expect(() => discardFirstCard(game)).toThrow("Draw pile is empty.");
});

test("throws when draw pile contains no number cards", () => {
  const game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [
      { type: "drawTwo", color: "red", id: "card-id-002" },
      { type: "reverse", color: "red", id: "card-id-003" },
      { type: "skip", color: "red", id: "card-id-004" },
      { type: "wild", isDrawFour: false, id: "card-id-005" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  expect(() => discardFirstCard(game)).toThrow(
    "Draw pile has no number cards.",
  );
});

test("emits card discarded event to all players", () => {
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
    drawPile: [{ type: "number", value: 1, color: "red", id: "card-id-001" }],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = discardFirstCard(game);

  expect(game.players[0]?.events.slice(-1)).toMatchObject([
    {
      type: "cardDiscarded",
      card: { type: "number", value: 1, color: "red", id: "card-id-001" },
    },
  ]);

  expect(game.players[1]?.events.slice(-1)).toMatchObject([
    {
      type: "cardDiscarded",
      card: { type: "number", value: 1, color: "red", id: "card-id-001" },
    },
  ]);
});
