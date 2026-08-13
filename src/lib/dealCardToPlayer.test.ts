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
    chatMessages: [],
  };

  game = dealCardToPlayer(game, "player-id-002");

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

test("emits cardDealtToPlayer event to all players", () => {
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
    chatMessages: [],
  };

  game = dealCardToPlayer(game, "player-id-002");

  expect(game.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardDealtToPlayer",
        username: "username-002",
      }),
    ]),
  );

  expect(game.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardDealtToPlayer",
        username: "username-002",
      }),
    ]),
  );
});

test("emits cardDealt event to player only", () => {
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
    chatMessages: [],
  };

  game = dealCardToPlayer(game, "player-id-002");

  expect(game.players[0]?.events).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardDealt",
        card: { type: "number", value: 1, color: "red", id: "card-id-003" },
      }),
    ]),
  );

  expect(game.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardDealt",
        card: { type: "number", value: 1, color: "red", id: "card-id-003" },
      }),
    ]),
  );
});
