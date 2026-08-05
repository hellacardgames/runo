import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { addCardToPlayerHand } from "./addCardToPlayerHand.js";
import type { Player } from "../types/Player.js";
import type { StartedGame } from "../types/Game.js";

test("adds card to player's hand", () => {
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
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = addCardToPlayerHand(game, "player-id-002", {
    type: "number",
    value: 1,
    color: "red",
    id: "card-id-004",
  });
  expect(game.players[1]?.hand).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-004" },
  ]);
  expect(game.players[0]?.hand).toHaveLength(0);
});

test("throws if player does not exist in game", () => {
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

  const game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [player1, player2],
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  expect(() =>
    addCardToPlayerHand(game, "some-random-id", {
      type: "number",
      value: 1,
      color: "red",
      id: "card-id-004",
    }),
  ).toThrow("Player some-random-id does not exist in game.");
});
