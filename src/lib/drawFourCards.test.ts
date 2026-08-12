import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { drawFourCards } from "./drawFourCards.js";
import type { StartedGame } from "../types/Game.js";

test("takes four cards from draw pile and gives to player", () => {
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
        hand: [{ type: "reverse", color: "red", id: "card-id-006" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 5, color: "green", id: "card-id-001" },
      { type: "number", value: 9, color: "blue", id: "card-id-002" },
      { type: "number", value: 1, color: "yellow", id: "card-id-003" },
      { type: "number", value: 2, color: "red", id: "card-id-004" },
      { type: "number", value: 3, color: "green", id: "card-id-005" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = drawFourCards(game, "player-id-002");

  expect(game.drawPile).toHaveLength(1);

  expect(game.players[1]?.hand).toEqual([
    { type: "reverse", color: "red", id: "card-id-006" },
    { type: "number", value: 3, color: "green", id: "card-id-005" },
    { type: "number", value: 2, color: "red", id: "card-id-004" },
    { type: "number", value: 1, color: "yellow", id: "card-id-003" },
    { type: "number", value: 9, color: "blue", id: "card-id-002" },
  ]);

  expect(game.players[0]?.hand).toHaveLength(0);
});

test("emits drewCard events to player", () => {
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
        hand: [{ type: "reverse", color: "red", id: "card-id-006" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 5, color: "green", id: "card-id-001" },
      { type: "number", value: 9, color: "blue", id: "card-id-002" },
      { type: "number", value: 1, color: "yellow", id: "card-id-003" },
      { type: "number", value: 2, color: "red", id: "card-id-004" },
      { type: "number", value: 3, color: "green", id: "card-id-005" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = drawFourCards(game, "player-id-002");

  expect(game.players[1]?.events.slice(0, 4)).toEqual([
    expect.objectContaining({
      type: "drewCard",
      card: { type: "number", value: 3, color: "green", id: "card-id-005" },
    }),
    expect.objectContaining({
      type: "drewCard",
      card: { type: "number", value: 2, color: "red", id: "card-id-004" },
    }),
    expect.objectContaining({
      type: "drewCard",
      card: { type: "number", value: 1, color: "yellow", id: "card-id-003" },
    }),
    expect.objectContaining({
      type: "drewCard",
      card: { type: "number", value: 9, color: "blue", id: "card-id-002" },
    }),
  ]);

  expect(game.players[0]?.events).not.toEqual(
    expect.arrayContaining([expect.objectContaining({ type: "drewCard" })]),
  );
});

test("emits playerDrewFourCards event to all players", () => {
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
        hand: [{ type: "reverse", color: "red", id: "card-id-006" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 5, color: "green", id: "card-id-001" },
      { type: "number", value: 9, color: "blue", id: "card-id-002" },
      { type: "number", value: 1, color: "yellow", id: "card-id-003" },
      { type: "number", value: 2, color: "red", id: "card-id-004" },
      { type: "number", value: 3, color: "green", id: "card-id-005" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = drawFourCards(game, "player-id-002");

  expect(game.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerDrewFourCards",
        username: "username-002",
      }),
    ]),
  );

  expect(game.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerDrewFourCards",
        username: "username-002",
      }),
    ]),
  );
});
