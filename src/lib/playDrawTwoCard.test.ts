import { expect, test } from "vitest";
import {
  CARDS,
  EXPIRY_EXTENSION_MS,
  INITIAL_HAND_SIZE,
  WINNING_SCORE,
} from "../constants.js";
import { playDrawTwoCard } from "./playDrawTwoCard.js";
import type { DrawTwoCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

test("removes card from player hand", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
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
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[1]!.hand).toEqual([
    { type: "number", value: 9, color: "yellow", id: "card-id-071" },
    { type: "number", value: 9, color: "blue", id: "card-id-002" },
    { type: "drawTwo", color: "green", id: "card-id-066" },
  ]);
});

test("adds card to top of discard pile", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
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
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.discardPile).toEqual([
    { type: "reverse", color: "yellow", id: "card-id-028" },
    { type: "drawTwo", color: "blue", id: "card-id-037" },
    drawTwoCard,
  ]);
});

test("makes next player draw two cards", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
        score: 0,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "number", value: 2, color: "green", id: "card-id-745" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[2]?.hand).toEqual([
    { type: "number", value: 2, color: "green", id: "card-id-745" },
    { type: "number", value: 1, color: "red", id: "card-id-102" },
    { type: "number", value: 1, color: "red", id: "card-id-101" },
  ]);
});

test("advances to next player", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
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
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.currentPlayerIndex).toBe(0);
});

test("does not advance to next player when only two players", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.currentPlayerIndex).toBe(1);
});

test("emits cardPlayed event to all players", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
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
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: drawTwoCard,
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: drawTwoCard,
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: drawTwoCard,
      }),
    ]),
  );
});

test("emits turnChanged event to all players", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
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
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-001",
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-001",
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-001",
      }),
    ]),
  );
});

test("does not emit turnChanged event when only two players", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
        hand: [
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
          drawTwoCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.events).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-001",
      }),
    ]),
  );

  expect(newGame.players[1]?.events).not.toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-001",
      }),
    ]),
  );
});

test("updates score when player wins round", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: 5,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      ...CARDS,
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[1]?.score).toBe(45);
});

test("emits playerWonRound event when player wins round", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: 5,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      ...CARDS,
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonRound",
        username: "username-002",
        score: 45,
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonRound",
        username: "username-002",
        score: 45,
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonRound",
        username: "username-002",
        score: 45,
      }),
    ]),
  );
});

test("starts new round when player wins round", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: 5,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      ...CARDS,
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: true,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.players[1]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.players[2]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.discardPile).toHaveLength(1);
  expect(newGame.isReversed).toBe(false);
});

test("does not advance to next player when player wins round", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: 5,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      ...CARDS,
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: true,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.currentPlayerIndex).toBe(1);
});

test("transitions to completed when player wins game", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: WINNING_SCORE - 1,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.status).toBe("completed");
});

test("emits playerWonGame event when player wins game", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: WINNING_SCORE - 1,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonGame",
        username: "username-002",
        score: WINNING_SCORE - 1 + 38 + 2,
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonGame",
        username: "username-002",
        score: WINNING_SCORE - 1 + 38 + 2,
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonGame",
        username: "username-002",
        score: WINNING_SCORE - 1 + 38 + 2,
      }),
    ]),
  );
});

test("emits gameCompleted event when player wins game", () => {
  const drawTwoCard: DrawTwoCard = {
    type: "drawTwo",
    color: "red",
    id: "card-id-001",
  };

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
          { type: "number", value: 9, color: "yellow", id: "card-id-071" },
          { type: "number", value: 9, color: "blue", id: "card-id-002" },
        ],
        score: 0,
      },
      {
        id: "player-id-002",
        userId: "user-id-002",
        username: "username-002",
        events: [],
        hand: [drawTwoCard],
        score: WINNING_SCORE - 1,
      },
      {
        id: "player-id-003",
        userId: "user-id-003",
        username: "username-003",
        events: [],
        hand: [{ type: "drawTwo", color: "green", id: "card-id-066" }],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
  };

  const newGame = playDrawTwoCard(game, drawTwoCard);

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ type: "gameCompleted" }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ type: "gameCompleted" }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ type: "gameCompleted" }),
    ]),
  );
});
