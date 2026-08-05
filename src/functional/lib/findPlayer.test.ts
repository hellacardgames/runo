import { expect, test } from "vitest";
import { findPlayer } from "./findPlayer.js";

test("returns player and index when player exists in game", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const { player, index } = findPlayer(game, "player-id-002");
  expect(player?.id).toBe("player-id-002");
  expect(index).toBe(1);
});

test("returns undefined and -1 when player does not exist in game", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
  };

  const { player, index } = findPlayer(game, "some-random-id");
  expect(player).toBeUndefined();
  expect(index).toBe(-1);
});
