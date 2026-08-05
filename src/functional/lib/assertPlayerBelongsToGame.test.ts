import { expect, test } from "vitest";
import { assertPlayerBelongsToGame } from "./assertPlayerBelongsToGame.js";

test("does not throw when player instance is in game", () => {
  const player = { id: "player-id-001" };
  const game = {
    players: [player],
  };
  expect(() => assertPlayerBelongsToGame(game, player)).not.toThrow();
});

test("throws when player id is not in game", () => {
  const player = { id: "player-id-001" };
  const game = {
    players: [player],
  };
  const otherPlayer = { id: "player-id-002" };
  expect(() => assertPlayerBelongsToGame(game, otherPlayer)).toThrow(
    "Player player-id-002 does not exist in game.",
  );
});

test("throws when player instance is not the one in game", () => {
  const player = { id: "player-id-001" };
  const game = {
    players: [player],
  };
  const differentInstance = { ...player };
  expect(() => assertPlayerBelongsToGame(game, differentInstance)).toThrow(
    "Player player-id-001 exists in game, but a different instance was provided.",
  );
});
