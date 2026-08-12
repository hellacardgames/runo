import { expect, test } from "vitest";
import { isCurrentPlayer } from "./isCurrentPlayer.js";

test("returns true if player exists and is current player", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
    currentPlayerIndex: 0,
  };

  expect(isCurrentPlayer(game, "player-id-001")).toBe(true);
});

test("returns false if player exists and is not current player", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
    currentPlayerIndex: 0,
  };

  expect(isCurrentPlayer(game, "player-id-002")).toBe(false);
});

test("throws if player does not exist in game", () => {
  const game = {
    players: [{ id: "player-id-001" }, { id: "player-id-002" }],
    currentPlayerIndex: 0,
  };

  expect(() => isCurrentPlayer(game, "some-random-id")).toThrow(
    "Player some-random-id does not exist in game.",
  );
});
