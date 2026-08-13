import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { skipNextPlayer } from "./skipNextPlayer.js";
import type { StartedGame } from "../types/Game.js";

test("skips the next player", () => {
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
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  game = skipNextPlayer(game);

  expect(game.currentPlayerIndex).toBe(0);
});

test("emits a turnChanged event to all players", () => {
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
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  game = skipNextPlayer(game);

  expect(game.players[0]?.events).toEqual([
    expect.objectContaining({
      type: "turnChanged",
      currentPlayerUsername: "username-001",
    }),
  ]);

  expect(game.players[1]?.events).toEqual([
    expect.objectContaining({
      type: "turnChanged",
      currentPlayerUsername: "username-001",
    }),
  ]);

  expect(game.players[2]?.events).toEqual([
    expect.objectContaining({
      type: "turnChanged",
      currentPlayerUsername: "username-001",
    }),
  ]);
});
