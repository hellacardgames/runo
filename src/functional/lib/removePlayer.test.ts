import { expect, test } from "vitest";
import { removePlayer } from "./removePlayer.js";

test("removes the given player", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
  };

  let result = removePlayer(game, "player-id-002");
  game = result.game;
  expect(game.players).toEqual([player1, player3]);

  result = removePlayer(game, "player-id-003");
  game = result.game;
  expect(game.players).toEqual([player1]);

  result = removePlayer(game, "player-id-001");
  game = result.game;
  expect(game.players).toEqual([]);
});

test("keeps current player when an earlier player is removed", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 2,
  };

  const result = removePlayer(game, "player-id-002");
  game = result.game;

  expect(game.currentPlayerIndex).toBe(1);
  expect(game.players[game.currentPlayerIndex]).toBe(player3);
});

test("keeps current player when a later player is removed", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 1,
  };

  const result = removePlayer(game, "player-id-003");
  game = result.game;

  expect(game.currentPlayerIndex).toBe(1);
  expect(game.players[game.currentPlayerIndex]).toBe(player2);
});

test("changes turn when removing current player", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
  };

  const result = removePlayer(game, "player-id-001");
  game = result.game;

  expect(result.turnChanged).toBe(true);
  expect(game.currentPlayerIndex).toBe(0);
  expect(game.players[game.currentPlayerIndex]).toBe(player2);
});

test("changes turn when removing current player in reverse", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 2,
    isReversed: true,
  };

  const result = removePlayer(game, "player-id-003");
  game = result.game;

  expect(result.turnChanged).toBe(true);
  expect(game.currentPlayerIndex).toBe(1);
  expect(game.players[game.currentPlayerIndex]).toBe(player2);
});

test("does not change turn when not removing current player", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
  };

  const result = removePlayer(game, "player-id-002");
  game = result.game;

  expect(result.turnChanged).toEqual(false);
  expect(game.currentPlayerIndex).toBe(0);
  expect(game.players[game.currentPlayerIndex]).toBe(player1);
});

test("wraps turn to first player when current last player is removed", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 2,
  };

  const result = removePlayer(game, "player-id-003");
  game = result.game;

  expect(result.turnChanged).toBe(true);
  expect(game.currentPlayerIndex).toBe(0);
  expect(game.players[game.currentPlayerIndex]).toBe(player1);
});

test("wraps turn to last player when reversed and current first player removed", () => {
  const player1 = { id: "player-id-001" };
  const player2 = { id: "player-id-002" };
  const player3 = { id: "player-id-003" };

  let game = {
    players: [player1, player2, player3],
    currentPlayerIndex: 0,
    isReversed: true,
  };

  const result = removePlayer(game, "player-id-001");
  game = result.game;

  expect(result.turnChanged).toBe(true);
  expect(game.currentPlayerIndex).toBe(1);
  expect(game.players[game.currentPlayerIndex]).toBe(player3);
});

test("throws when player does not exist in game", () => {
  const player1 = { id: "player-id-001" };

  const game = {
    players: [player1],
    currentPlayerIndex: 0,
  };

  expect(() => removePlayer(game, "some-random-id")).toThrow(
    "Player some-random-id does not exist in game.",
  );
});
