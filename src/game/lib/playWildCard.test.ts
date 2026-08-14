import { expect, test } from "vitest";
import {
  CARDS,
  EXPIRY_EXTENSION_MS,
  INITIAL_HAND_SIZE,
  WINNING_SCORE,
} from "../constants.js";
import { playWildCard } from "./playWildCard.js";
import type { WildCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

test("removes card from player hand", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
          wildCard,
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
    drawPile: [],
    discardPile: [],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[1]!.hand).toEqual([
    { type: "number", value: 9, color: "yellow", id: "card-id-071" },
    { type: "number", value: 9, color: "blue", id: "card-id-002" },
    { type: "drawTwo", color: "green", id: "card-id-066" },
  ]);
});

test("adds card to top of discard pile", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
          wildCard,
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
    drawPile: [],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.discardPile).toEqual([
    { type: "reverse", color: "yellow", id: "card-id-028" },
    { type: "drawTwo", color: "blue", id: "card-id-037" },
    { type: "discardedWild", card: wildCard, color: "blue" },
  ]);
});

test("makes next player draw four cards", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: true,
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
          wildCard,
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
      { type: "number", value: 1, color: "red", id: "card-id-103" },
      { type: "number", value: 1, color: "red", id: "card-id-104" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[2]?.hand).toEqual([
    { type: "number", value: 2, color: "green", id: "card-id-745" },
    { type: "number", value: 1, color: "red", id: "card-id-104" },
    { type: "number", value: 1, color: "red", id: "card-id-103" },
    { type: "number", value: 1, color: "red", id: "card-id-102" },
    { type: "number", value: 1, color: "red", id: "card-id-101" },
  ]);
});

test("advances to next player", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
          wildCard,
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
    drawPile: [],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.currentPlayerIndex).toBe(2);
});

test("advances to player after next when card is a draw four", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: true,
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
          wildCard,
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
      { type: "number", value: 1, color: "yellow", id: "card-id-101" },
      { type: "number", value: 1, color: "yellow", id: "card-id-102" },
      { type: "number", value: 1, color: "yellow", id: "card-id-103" },
      { type: "number", value: 1, color: "yellow", id: "card-id-104" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.currentPlayerIndex).toBe(0);
});

test("does not change current player when only two players and card is a draw four", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: true,
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
          wildCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
      { type: "number", value: 1, color: "red", id: "card-id-103" },
      { type: "number", value: 1, color: "red", id: "card-id-104" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.currentPlayerIndex).toBe(1);
});

test("emits cardPlayed event to all players", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
          wildCard,
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
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: { type: "discardedWild", card: wildCard, color: "blue" },
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: { type: "discardedWild", card: wildCard, color: "blue" },
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: { type: "discardedWild", card: wildCard, color: "blue" },
      }),
    ]),
  );
});

test("emits turnChanged event to all players", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
          wildCard,
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
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-003",
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-003",
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "turnChanged",
        currentPlayerUsername: "username-003",
      }),
    ]),
  );
});

test("does not emit turnChanged event when only two players and card is a draw four", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: true,
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
          wildCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
        score: 0,
      },
    ],
    drawPile: [
      { type: "number", value: 1, color: "red", id: "card-id-101" },
      { type: "number", value: 1, color: "red", id: "card-id-102" },
      { type: "number", value: 1, color: "red", id: "card-id-103" },
      { type: "number", value: 1, color: "red", id: "card-id-104" },
    ],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

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
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [...CARDS],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[1]?.score).toBe(43);
});

test("emits playerWonRound event when player wins round", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [...CARDS],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonRound",
        username: "username-002",
        score: 43,
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonRound",
        username: "username-002",
        score: 43,
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonRound",
        username: "username-002",
        score: 43,
      }),
    ]),
  );
});

test("starts new round when player wins round", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [...CARDS],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: true,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[0]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.players[1]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.players[2]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.discardPile).toHaveLength(1);
  expect(newGame.isReversed).toBe(false);
});

test("does not advance to next player when player wins round", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [...CARDS],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: true,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.currentPlayerIndex).toBe(1);
});

test("transitions to completed when player wins game", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.status).toBe("completed");
});

test("emits playerWonGame event when player wins game", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonGame",
        username: "username-002",
        score: WINNING_SCORE - 1 + 38,
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonGame",
        username: "username-002",
        score: WINNING_SCORE - 1 + 38,
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "playerWonGame",
        username: "username-002",
        score: WINNING_SCORE - 1 + 38,
      }),
    ]),
  );
});

test("emits gameCompleted event when player wins game", () => {
  const wildCard: WildCard = {
    type: "wild",
    isDrawFour: false,
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
        hand: [wildCard],
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
    drawPile: [],
    discardPile: [
      { type: "reverse", color: "yellow", id: "card-id-028" },
      { type: "drawTwo", color: "blue", id: "card-id-037" },
    ],
    currentPlayerIndex: 1,
    isReversed: false,
    chatMessages: [],
  };

  const newGame = playWildCard(game, wildCard, "blue");

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
