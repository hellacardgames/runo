import { expect, test } from "vitest";
import { requirePlayer } from "./requirePlayer.js";

test("returns player when player id exists in game", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  const { player } = requirePlayer(game, "player-id-001");

  expect(player.id).toBe("player-id-001");
});

test("throws when player id does not exist in game", () => {
  const game = {
    players: [{ id: "player-id-001" }],
  };

  expect(() => requirePlayer(game, "some-random-id")).toThrow(
    "Player some-random-id does not exist in game.",
  );
});
