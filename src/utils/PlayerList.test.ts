import { expect, test } from "vitest";
import { PlayerList } from "./PlayerList.js";

type Player = {
  readonly id: string;
};

test("starts empty and not reversed", () => {
  const playerList = new PlayerList<Player>();
  expect(playerList).toHaveLength(0);
  expect(playerList.currentPlayer).toBeUndefined();
  expect(playerList.isReversed).toBe(false);
});

test("iterates over players in order", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  const players = [...playerList];
  expect(players[0]).toBe(player1);
  expect(players[1]).toBe(player2);
});

test("first player added becomes current player", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  playerList.add(player1);
  expect(playerList.currentPlayer).toBe(player1);
});

test("adding players does not change current player", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  expect(playerList.currentPlayer).toBe(player1);
});

test("gets a player at an index", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  playerList.add(player1);
  expect(playerList.getAt(0)).toBe(player1);
});

test("returns undefined for an invalid index", () => {
  const playerList = new PlayerList<Player>();
  expect(playerList.getAt(0)).toBeUndefined();
});

test("reports the number of players", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  expect(playerList).toHaveLength(0);
  playerList.add(player1);
  expect(playerList).toHaveLength(1);
  playerList.add(player2);
  expect(playerList).toHaveLength(2);
});

test("finds a player by id", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  playerList.add(player1);
  expect(playerList.findById("player1")).toBe(player1);
});

test("returns undefined when the id is not found", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  playerList.add(player1);
  expect(playerList.findById("invalid-id")).toBeUndefined();
});

test("finds the correct player among multiple players", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  expect(playerList.findById("player2")).toBe(player2);
});

test("toggles reversed state when changing direction", () => {
  const playerList = new PlayerList<Player>();
  expect(playerList.isReversed).toBe(false);
  playerList.changeDirection();
  expect(playerList.isReversed).toBe(true);
  playerList.changeDirection();
  expect(playerList.isReversed).toBe(false);
});
