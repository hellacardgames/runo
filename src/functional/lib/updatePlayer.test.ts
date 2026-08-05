import { expect, test } from "vitest";
import { updatePlayer } from "./updatePlayer.js";

test("updates player if player exists in game", () => {
  let game = {
    players: [
      { id: "player-id-001", name: "bob" },
      { id: "player-id-002", name: "alice" },
    ],
  };

  game = updatePlayer(game, "player-id-001", (p) => ({ ...p, name: "ralph" }));

  expect(game.players).toEqual([
    { id: "player-id-001", name: "ralph" },
    { id: "player-id-002", name: "alice" },
  ]);
});

test("throws when player id does not exist in game", () => {
  const game = {
    players: [
      { id: "player-id-001", name: "bob" },
      { id: "player-id-002", name: "alice" },
    ],
  };

  expect(() =>
    updatePlayer(game, "some-random-id", (p) => ({ ...p, name: "ralph" })),
  ).toThrow("Player some-random-id does not exist in game.");
});
