import { expect, test } from "vitest";
import { acknowledgeAndGetEvents } from "./acknowledgeAndGetEvents.js";

type Game = {
  players: Player[];
};

type Player = {
  id: string;
  events: {
    id: string;
    type: string;
  }[];
};

test("returns all events and purges none when lastReadId is null", () => {
  const player: Player = {
    id: "player-id-001",
    events: [
      { type: "some-event", id: "event-id-001" },
      { type: "some-event", id: "event-id-002" },
      { type: "some-event", id: "event-id-003" },
      { type: "some-event", id: "event-id-004" },
      { type: "some-event", id: "event-id-005" },
    ],
  };

  const game: Game = {
    players: [player],
  };

  const result = acknowledgeAndGetEvents(game, "player-id-001", null);

  expect(result.events).toEqual([
    { type: "some-event", id: "event-id-001" },
    { type: "some-event", id: "event-id-002" },
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);

  expect(result.game.players[0]?.events).toEqual([
    { type: "some-event", id: "event-id-001" },
    { type: "some-event", id: "event-id-002" },
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);
});

test("returns all events and purges none when lastReadId is not found", () => {
  const player: Player = {
    id: "player-id-001",
    events: [
      { type: "some-event", id: "event-id-001" },
      { type: "some-event", id: "event-id-002" },
      { type: "some-event", id: "event-id-003" },
      { type: "some-event", id: "event-id-004" },
      { type: "some-event", id: "event-id-005" },
    ],
  };

  const game: Game = {
    players: [player],
  };

  const result = acknowledgeAndGetEvents(
    game,
    "player-id-001",
    "non-existent-id",
  );

  expect(result.events).toEqual([
    { type: "some-event", id: "event-id-001" },
    { type: "some-event", id: "event-id-002" },
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);

  expect(result.game.players[0]?.events).toEqual([
    { type: "some-event", id: "event-id-001" },
    { type: "some-event", id: "event-id-002" },
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);
});

test("purges acknowledged events and returns unread events", () => {
  const player: Player = {
    id: "player-id-001",
    events: [
      { type: "some-event", id: "event-id-001" },
      { type: "some-event", id: "event-id-002" },
      { type: "some-event", id: "event-id-003" },
      { type: "some-event", id: "event-id-004" },
      { type: "some-event", id: "event-id-005" },
    ],
  };

  const game: Game = {
    players: [player],
  };

  const result = acknowledgeAndGetEvents(game, "player-id-001", "event-id-002");

  expect(result.events).toEqual([
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);

  expect(result.game.players[0]?.events).toEqual([
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);
});

test("acknowledges the first event", () => {
  const player: Player = {
    id: "player-id-001",
    events: [
      { type: "some-event", id: "event-id-001" },
      { type: "some-event", id: "event-id-002" },
      { type: "some-event", id: "event-id-003" },
      { type: "some-event", id: "event-id-004" },
      { type: "some-event", id: "event-id-005" },
    ],
  };

  const game: Game = {
    players: [player],
  };

  const result = acknowledgeAndGetEvents(game, "player-id-001", "event-id-001");

  expect(result.events).toEqual([
    { type: "some-event", id: "event-id-002" },
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);

  expect(result.game.players[0]?.events).toEqual([
    { type: "some-event", id: "event-id-002" },
    { type: "some-event", id: "event-id-003" },
    { type: "some-event", id: "event-id-004" },
    { type: "some-event", id: "event-id-005" },
  ]);
});

test("acknowledges the last event", () => {
  const player: Player = {
    id: "player-id-001",
    events: [
      { type: "some-event", id: "event-id-001" },
      { type: "some-event", id: "event-id-002" },
      { type: "some-event", id: "event-id-003" },
      { type: "some-event", id: "event-id-004" },
      { type: "some-event", id: "event-id-005" },
    ],
  };

  const game: Game = {
    players: [player],
  };

  const result = acknowledgeAndGetEvents(game, "player-id-001", "event-id-005");

  expect(result.events).toEqual([]);
  expect(result.game.players[0]?.events).toEqual([]);
});

test("returns no events when there are no events", () => {
  const player: Player = {
    id: "player-id-001",
    events: [],
  };

  const game: Game = {
    players: [player],
  };

  const result = acknowledgeAndGetEvents(game, "player-id-001", null);

  expect(result.events).toEqual([]);
  expect(result.game.players[0]?.events).toEqual([]);
});
