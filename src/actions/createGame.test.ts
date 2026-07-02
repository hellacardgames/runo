import { beforeEach, expect, test } from "vitest";
import { createGame } from "./createGame.js";
import { games } from "../games.js";
import { MAX_GAMES } from "../constants.js";

beforeEach(() => {
  games.clear();
});

test("creates an open game with one player", () => {
  const result = createGame("Bob");
  if (!result.success) {
    throw new Error("Expected createGame to succeed.");
  }
  expect(games.size).toBe(1);
  const game = games.get(result.gameId);
  if (!game) {
    throw new Error("Expected game to exist.");
  }
  expect(game.status).toBe("open");
  expect(game.players).toHaveLength(1);
  const player = game.players.find((p) => p.id === result.playerId);
  if (!player) {
    throw new Error("Expected player to exist.");
  }
  expect(player.name).toBe("Bob");
  expect(player.roundsWon).toBe(0);
  expect(player.points).toBe(0);
});

test("does not allow creating more than MAX_GAMES", () => {
  for (let i = 0; i < MAX_GAMES; i++) {
    const result = createGame("Bob");
    expect(result.success).toBe(true);
  }
  const result = createGame("Bob");
  if (result.success) {
    throw new Error("Expected createGame to fail.");
  }
  expect(result.error).toBe("maxGamesReached");
});
