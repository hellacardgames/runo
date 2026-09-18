import { expect, test } from "vitest";
import { createGame } from "./createGame.js";
import { joinGame } from "./joinGame.js";
import { MAX_PLAYERS } from "../constants.js";

test("adds a player", () => {
  let { game } = createGame("user-id-001", "bob");
  const result = joinGame(game, "user-id-002", "alice");
  if (!result.success) {
    throw new Error("Expected joinGame to succeed.");
  }
  ({ game } = result);
  expect(game.players).toHaveLength(2);
  const player = game.players[1];
  if (!player) {
    throw new Error("Expected player to be defined.");
  }
  expect(player.id).toBe(result.playerId);
  expect(player.userId).toBe("user-id-002");
  expect(player.username).toBe("alice");
  expect(player.events).toHaveLength(0);
  expect(player.hand).toHaveLength(0);
  expect(player.score).toBe(0);
});

test("allows up to MAX_PLAYERS players", () => {
  let { game } = createGame("user-id-000", "username");
  for (let i = 0; i < MAX_PLAYERS - 1; i++) {
    const result = joinGame(game, `user-id-00${i + 1}`, "username");
    if (!result.success) {
      throw new Error("Expected joinGame to succeed.");
    }
    ({ game } = result);
  }
  const joinGameResult = joinGame(game, "user-id-010", "username");
  if (joinGameResult.success) {
    throw new Error("Expected joinGame to fail.");
  }
  expect(joinGameResult.error).toBe("maxPlayersReached");
});

test("prevents same user from joining twice", () => {
  const { game } = createGame("user-id-001", "bob");
  const result = joinGame(game, "user-id-001", "bob");
  if (result.success) {
    throw new Error("Expected joinGame to fail.");
  }
  expect(result.error).toBe("alreadyInGame");
});
