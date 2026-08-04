import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { dealCardToPlayer } from "./dealCardToPlayer.js";
import type { Player } from "../types/Player.js";
import type { StartedGame } from "../types/Game.js";

test("deals card to player", () => {
  const player1: Player = {
    id: "player-id-001",
    userId: "user-id-001",
    username: "username-001",
    events: [],
    hand: [],
    score: 0,
  };
  const player2: Player = {
    id: "player-id-002",
    userId: "user-id-002",
    username: "username-002",
    events: [],
    hand: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
    ],
    score: 0,
  };

  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [player1, player2],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-004" },
      { type: "number", value: 1, color: "red", id: "card-id-005" },
      { type: "number", value: 1, color: "red", id: "card-id-006" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = dealCardToPlayer(game, player2);

  expect(game.players[1]?.hand).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-006" },
  ]);

  expect(game.drawPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-004" },
    { type: "number", value: 1, color: "red", id: "card-id-005" },
  ]);
});

test("emits card dealt events", () => {
  const player1: Player = {
    id: "player-id-001",
    userId: "user-id-001",
    username: "username-001",
    events: [],
    hand: [],
    score: 0,
  };
  const player2: Player = {
    id: "player-id-002",
    userId: "user-id-002",
    username: "username-002",
    events: [],
    hand: [],
    score: 0,
  };

  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [player1, player2],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = dealCardToPlayer(game, player2);

  expect(game.players[0]?.events.slice(-1)).toMatchObject([
    { type: "cardDealtToPlayer", username: "username-002" },
  ]);

  expect(game.players[1]?.events.slice(-2)).toMatchObject([
    {
      type: "cardDealt",
      card: { type: "number", value: 1, color: "red", id: "card-id-003" },
    },
    { type: "cardDealtToPlayer", username: "username-002" },
  ]);
});
