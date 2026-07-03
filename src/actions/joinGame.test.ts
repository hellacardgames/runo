import { beforeEach, expect, test } from "vitest";
import { createGame } from "./createGame.js";
import { games } from "../games.js";
import { joinGame } from "./joinGame.js";
import { MAX_PLAYERS } from "../constants.js";

beforeEach(() => {
  games.clear();
});

test("adds a player", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  const joinGameResult = joinGame(createGameResult.gameId, "Sally");
  if (!joinGameResult.success) {
    throw new Error("Expected joinGame to succeed.");
  }
  const game = games.get(createGameResult.gameId);
  if (!game) {
    throw new Error("Expected game to exist.");
  }
  expect(game.players).toHaveLength(2);
  const player = game.players.find((p) => p.id === joinGameResult.playerId);
  if (!player) {
    throw new Error("Expected player to exist.");
  }
  expect(player.name).toBe("Sally");
  expect(player.hand).toHaveLength(0);
  expect(player.roundsWon).toBe(0);
  expect(player.points).toBe(0);
  expect(player).toBe(game.players[1]);
});

test("allows up to MAX_PLAYERS players", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  for (let i = 0; i < MAX_PLAYERS - 1; i++) {
    const joinGameResult = joinGame(createGameResult.gameId, "Bob");
    expect(joinGameResult.success).toBe(true);
  }
  const joinGameResult = joinGame(createGameResult.gameId, "Bob");
  if (joinGameResult.success) {
    throw new Error("Expected joinGame to fail.");
  }
  expect(joinGameResult.error).toBe("maxPlayersReached");
});

test("only allows joining open games", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  const game = games.get(createGameResult.gameId);
  if (!game) {
    throw new Error("Expected game to exist.");
  }
  for (const status of ["active", "completed", "forfeited"] as const) {
    game.status = status;
    const joinGameResult = joinGame(createGameResult.gameId, "Bob");
    if (joinGameResult.success) {
      throw new Error("Expected joinGame to fail.");
    }
    expect(joinGameResult.error).toBe("invalidStatus");
  }
});
