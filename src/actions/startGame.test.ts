import { beforeEach, expect, test } from "vitest";
import { games } from "../games.js";
import { createGame } from "./createGame.js";
import { joinGame } from "./joinGame.js";
import { startGame } from "./startGame.js";

beforeEach(() => {
  games.clear();
});

test("transitions game from open to active", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  const joinGameResult = joinGame(createGameResult.gameId, "Sally");
  if (!joinGameResult.success) {
    throw new Error("Expected joinGame to succeed.");
  }
  const { gameId, playerId } = createGameResult;
  const startGameResult = startGame(gameId, playerId);
  expect(startGameResult.success).toBe(true);
  const game = games.get(gameId);
  if (!game) {
    throw new Error("Expected game to exist.");
  }
  expect(game.status).toBe("active");
  expect(game.currentPlayerIndex).toBe(0);
});

test("only allows starting open games", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  joinGame(createGameResult.gameId, "Bob");
  const game = games.get(createGameResult.gameId);
  if (!game) {
    throw new Error("Expected game to exist.");
  }
  const player = game.players.find((p) => p.id === createGameResult.playerId);
  if (!player) {
    throw new Error("Expected player to exist.");
  }
  for (const status of ["active", "completed", "forfeited"] as const) {
    game.status = status;
    const { gameId, playerId } = createGameResult;
    const startGameResult = startGame(gameId, playerId);
    if (startGameResult.success) {
      throw new Error("Expected startGame to fail.");
    }
    expect(startGameResult.error).toBe("invalidStatus");
  }
});

test("only allows admin to start games", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  const joinGameResult = joinGame(createGameResult.gameId, "Sally");
  if (!joinGameResult.success) {
    throw new Error("Expected joinGame to succeed.");
  }
  const { gameId } = createGameResult;
  const { playerId } = joinGameResult;
  const startGameResult = startGame(gameId, playerId);
  if (startGameResult.success) {
    throw new Error("Expected startGame to fail.");
  }
  expect(startGameResult.error).toBe("notAdmin");
});

test("requires at least MIN_PLAYERS players", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  const { gameId, playerId } = createGameResult;
  const startGameResult = startGame(gameId, playerId);
  if (startGameResult.success) {
    throw new Error("Expected startGame to fail.");
  }
  expect(startGameResult.error).toBe("minPlayersNotReached");
});
