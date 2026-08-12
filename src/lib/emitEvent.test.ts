import { expect, test } from "vitest";
import { emitEvent } from "./emitEvent.js";

type Game = {
  players: {
    events: {
      id: string;
      type: string;
    }[];
  }[];
};

test("emits event to all players", () => {
  let game: Game = {
    players: [{ events: [] }, { events: [] }],
  };

  game = emitEvent(game, { type: "some-event" });

  expect(game.players[0]?.events).toEqual([
    expect.objectContaining({ type: "some-event" }),
  ]);

  expect(game.players[1]?.events).toEqual([
    expect.objectContaining({ type: "some-event" }),
  ]);
});

test("assigns an id to the emitted event", () => {
  let game: Game = {
    players: [{ events: [] }],
  };

  game = emitEvent(game, { type: "some-event" });

  expect(game.players[0]?.events[0]?.id).toEqual(expect.any(String));
});

test("emits the same event instance to all players", () => {
  let game: Game = {
    players: [{ events: [] }, { events: [] }],
  };

  game = emitEvent(game, { type: "some-event" });

  expect(game.players[0]?.events[0]).toBe(game.players[1]?.events[0]);
});
