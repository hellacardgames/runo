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

test("", () => {
  const player1 = { id: "player-id-001", events: [] };
  const player2 = { id: "player-id-002", events: [] };

  let game: Game = {
    players: [player1, player2],
  };

  game = emitEventToPlayer(game, player1, { type: "some-event" });

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

  game = emitEventToPlayer(game, player1, { type: "some-event" });

  expect(game.players[0]?.events[0]?.id).toEqual(expect.any(String));
});
