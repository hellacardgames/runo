import { expect, test } from "vitest";
import { emitEventToPlayer } from "./emitEventToPlayer.js";

type Game = {
  players: {
    id: string;
    events: {
      id: string;
      type: string;
    }[];
  }[];
};

test("emits event to the given player only", () => {
  const player1 = { id: "player-id-001", events: [] };
  const player2 = { id: "player-id-002", events: [] };

  let game: Game = {
    players: [player1, player2],
  };

  game = emitEventToPlayer(game, "player-id-001", { type: "some-event" });

  expect(game.players[0]?.events).toEqual([
    expect.objectContaining({ type: "some-event" }),
  ]);

  expect(game.players[1]?.events).toHaveLength(0);
});

test("assigns an id to the emitted event", () => {
  const player1 = { id: "player-id-001", events: [] };

  let game: Game = {
    players: [player1],
  };

  game = emitEventToPlayer(game, "player-id-001", { type: "some-event" });

  expect(game.players[0]?.events[0]?.id).toEqual(expect.any(String));
});

test("throws if player does not exist in game", () => {
  const player1 = { id: "player-id-001", events: [] };

  const game: Game = {
    players: [player1],
  };

  expect(() =>
    emitEventToPlayer(game, "some-random-id", { type: "some-event" }),
  ).toThrow("Player some-random-id does not exist in game.");
});
