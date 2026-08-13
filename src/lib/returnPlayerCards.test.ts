import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { returnPlayerCards } from "./returnPlayerCards.js";
import type { StartedGame } from "../types/Game.js";

test("returns player cards to draw pile", () => {
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
        hand: [
          { type: "number", value: 1, color: "blue", id: "card-id-009" },
          { type: "number", value: 9, color: "green", id: "card-id-058" },
          { type: "drawTwo", color: "red", id: "card-id-005" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [
          { type: "drawTwo", color: "red", id: "card-id-025" },
          { type: "skip", color: "blue", id: "card-id-047" },
        ],
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
      { type: "number", value: 2, color: "yellow", id: "card-id-072" },
      { type: "number", value: 7, color: "yellow", id: "card-id-001" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  game = returnPlayerCards(game);

  const sortedDrawPile = game.drawPile
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  expect(sortedDrawPile).toEqual([
    { type: "number", value: 7, color: "yellow", id: "card-id-001" },
    { type: "drawTwo", color: "red", id: "card-id-005" },
    { type: "number", value: 1, color: "blue", id: "card-id-009" },
    { type: "drawTwo", color: "red", id: "card-id-025" },
    { type: "skip", color: "blue", id: "card-id-047" },
    { type: "number", value: 9, color: "green", id: "card-id-058" },
    { type: "number", value: 2, color: "yellow", id: "card-id-072" },
  ]);

  expect(game.players[0]!.hand).toHaveLength(0);
  expect(game.players[1]!.hand).toHaveLength(0);
  expect(game.players[2]!.hand).toHaveLength(0);
});

test("does nothing when players have no cards", () => {
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
      { type: "number", value: 2, color: "yellow", id: "card-id-072" },
      { type: "number", value: 7, color: "yellow", id: "card-id-001" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  game = returnPlayerCards(game);

  expect(game.drawPile).toEqual([
    { type: "number", value: 2, color: "yellow", id: "card-id-072" },
    { type: "number", value: 7, color: "yellow", id: "card-id-001" },
  ]);

  expect(game.players[0]!.hand).toHaveLength(0);
  expect(game.players[1]!.hand).toHaveLength(0);
  expect(game.players[2]!.hand).toHaveLength(0);
});
