import { expect, test } from "vitest";
import { createGame } from "./createGame.js";
import { CARDS } from "../constants.js";

test("creates a new game with the initial player", () => {
  const { game, playerId } = createGame("user-id-001", "bob");
  expect(game.createdAt).toBeLessThanOrEqual(Date.now());
  expect(game.expiresAt).toBeGreaterThan(Date.now());
  expect(game.status).toBe("created");
  expect(game.drawPile).toBe(CARDS);
  expect(game.discardPile).toHaveLength(0);
  expect(game.currentPlayerIndex).toBe(0);
  expect(game.isReversed).toBe(false);
  expect(game.players).toHaveLength(1);
  const player = game.players[0];
  if (!player) {
    throw new Error("Expected player to be defined.");
  }
  expect(player.id).toBe(playerId);
  expect(player.userId).toBe("user-id-001");
  expect(player.username).toBe("bob");
  expect(player.events).toHaveLength(0);
  expect(player.hand).toHaveLength(0);
  expect(player.score).toBe(0);
});
