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

test("removes a player from the list", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.remove(player1);
  expect(playerList).toHaveLength(1);
  expect(playerList.getAt(0)).toBe(player2);
});

test("returns to empty state when all players are removed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.remove(player1);
  playerList.remove(player2);
  expect(playerList).toHaveLength(0);
  expect(playerList.getAt(0)).toBeUndefined();
  expect(playerList.currentPlayer).toBeUndefined();
});

test("sets the first player added after being empty as current", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.remove(player1);
  playerList.remove(player2);
  playerList.add(player3);
  expect(playerList.currentPlayer).toBe(player3);
});

test("advances to next player when current player is removed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.remove(player1);
  expect(playerList.currentPlayer).toBe(player2);
});

test("moves to previous player when current player is removed while reversed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  playerList.changeDirection();
  playerList.remove(player1);
  expect(playerList.currentPlayer).toBe(player3);
});

test("wraps to first player when last current player is removed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  playerList.advance();
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player3);
  playerList.remove(player3);
  expect(playerList.currentPlayer).toBe(player1);
});

test("wraps to last player when first current player is removed while reversed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  playerList.changeDirection();
  playerList.remove(player1);
  expect(playerList.currentPlayer).toBe(player3);
});

test("keeps current player when a later player is removed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  expect(playerList.currentPlayer).toBe(player1);
  playerList.remove(player2);
  expect(playerList.currentPlayer).toBe(player1);
  playerList.remove(player3);
  expect(playerList.currentPlayer).toBe(player1);
});

test("keeps current player when an earlier player is removed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  playerList.advance();
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player3);
  playerList.remove(player1);
  expect(playerList.currentPlayer).toBe(player3);
  playerList.remove(player2);
  expect(playerList.currentPlayer).toBe(player3);
});

test("advances to next player", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  playerList.add(player1);
  playerList.add(player2);
  expect(playerList.currentPlayer).toBe(player1);
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player2);
});

test("advances in reverse direction when reversed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  playerList.advance();
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player3);
  playerList.changeDirection();
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player2);
});

test("wraps to last player when advancing from first current player while reversed", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  expect(playerList.currentPlayer).toBe(player1);
  playerList.changeDirection();
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player3);
});

test("wraps to first player when advancing from last current player", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  const player2 = { id: "player2" };
  const player3 = { id: "player3" };
  playerList.add(player1);
  playerList.add(player2);
  playerList.add(player3);
  playerList.advance();
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player3);
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player1);
});

test("does not advance when there are no players", () => {
  const playerList = new PlayerList<Player>();
  playerList.advance();
  expect(playerList.currentPlayer).toBeUndefined();
});

test("does not advance when there is one player", () => {
  const playerList = new PlayerList<Player>();
  const player1 = { id: "player1" };
  playerList.add(player1);
  expect(playerList.currentPlayer).toBe(player1);
  playerList.advance();
  expect(playerList.currentPlayer).toBe(player1);
});
