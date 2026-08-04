import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { dealCardsToPlayers } from "./dealCardsToPlayers.js";
import type { StartedGame } from "../types/Game.js";

test("deals cards to players in round-robin order", () => {
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
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };
  game = dealCardsToPlayers(game, 3);
  expect(game.players[0]?.hand).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-009" },
    { type: "number", value: 1, color: "red", id: "card-id-006" },
    { type: "number", value: 1, color: "red", id: "card-id-003" },
  ]);
  expect(game.players[1]?.hand).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-008" },
    { type: "number", value: 1, color: "red", id: "card-id-005" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
  ]);
  expect(game.players[2]?.hand).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-007" },
    { type: "number", value: 1, color: "red", id: "card-id-004" },
    { type: "number", value: 1, color: "red", id: "card-id-001" },
  ]);
  expect(game.drawPile).toHaveLength(0);
});
