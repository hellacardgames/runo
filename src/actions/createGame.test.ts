import { beforeEach, expect, test } from "vitest";
import { createGame } from "./createGame.js";
import { games } from "../games.js";
import { MAX_GAMES } from "../constants.js";

beforeEach(() => {
  games.clear();
});

test("creates an open game with one player", () => {
  const createGameResult = createGame("Bob");
  if (!createGameResult.success) {
    throw new Error("Expected createGame to succeed.");
  }
  expect(games.size).toBe(1);
  const game = games.get(createGameResult.gameId);
  if (!game) {
    throw new Error("Expected game to exist.");
  }
  expect(game.status).toBe("open");
  expect(game.drawPile).toHaveLength(0);
  expect(game.discardPile).toHaveLength(0);
  expect(game.currentPlayerIndex).toBe(0);
  expect(game.players).toHaveLength(1);
  const player = game.players.find((p) => p.id === createGameResult.playerId);
  if (!player) {
    throw new Error("Expected player to exist.");
  }
  expect(player.name).toBe("Bob");
  expect(player.hand).toHaveLength(0);
  expect(player.roundsWon).toBe(0);
  expect(player.points).toBe(0);
});

test("allows creating up to MAX_GAMES games", () => {
  for (let i = 0; i < MAX_GAMES; i++) {
    const createGameResult = createGame("Bob");
    expect(createGameResult.success).toBe(true);
  }
  const createGameResult = createGame("Bob");
  if (createGameResult.success) {
    throw new Error("Expected createGame to fail.");
  }
  expect(createGameResult.error).toBe("maxGamesReached");
});
