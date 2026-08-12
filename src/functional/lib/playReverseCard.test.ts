import { expect, test } from "vitest";
import {
  CARDS,
  EXPIRY_EXTENSION_MS,
  INITIAL_HAND_SIZE,
  WINNING_SCORE,
} from "../constants.js";
import { playReverseCard } from "./playReverseCard.js";
import type { ReverseCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

test("removes card from player hand", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.players[1]!.hand).toEqual([
    { type: "number", value: 9, color: "yellow", id: "card-id-071" },
    { type: "number", value: 9, color: "blue", id: "card-id-002" },
    { type: "drawTwo", color: "green", id: "card-id-066" },
  ]);
});

test("adds card to top of discard pile", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.discardPile).toEqual([
    { type: "reverse", color: "yellow", id: "card-id-028" },
    { type: "drawTwo", color: "blue", id: "card-id-037" },
    reverseCard,
  ]);
});

test("advances to next player", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.currentPlayerIndex).toBe(0);
});

test("does not advance to next player when only two players", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.currentPlayerIndex).toBe(1);
});

test("emits cardPlayed event to all players", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.players[0]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: reverseCard,
      }),
    ]),
  );

  expect(newGame.players[1]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: reverseCard,
      }),
    ]),
  );

  expect(newGame.players[2]?.events).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        type: "cardPlayed",
        username: "username-002",
        card: reverseCard,
      }),
    ]),
  );
});

test("emits turnChanged event to all players", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
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
  };

  const newGame = playReverseCard(game, reverseCard);

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
  const reverseCard: ReverseCard = {
    type: "reverse",
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
          reverseCard,
          { type: "drawTwo", color: "green", id: "card-id-066" },
        ],
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
  };

  const newGame = playReverseCard(game, reverseCard);

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
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.players[1]?.score).toBe(43);
});

test("emits playerWonRound event when player wins round", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

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
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.players[0]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.players[1]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.players[2]?.hand).toHaveLength(INITIAL_HAND_SIZE);
  expect(newGame.discardPile).toHaveLength(1);
  expect(newGame.isReversed).toBe(false);
});

test("does not advance to next player when player wins round", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.currentPlayerIndex).toBe(1);
});

test("transitions to completed when player wins game", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

  expect(newGame.status).toBe("completed");
});

test("emits playerWonGame event when player wins game", () => {
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

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
  const reverseCard: ReverseCard = {
    type: "reverse",
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
        hand: [reverseCard],
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
  };

  const newGame = playReverseCard(game, reverseCard);

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
