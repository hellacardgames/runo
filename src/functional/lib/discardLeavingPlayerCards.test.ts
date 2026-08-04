import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { discardLeavingPlayerCards } from "./discardLeavingPlayerCards.js";
import type { Player } from "../types/Player.js";
import type { Game } from "../types/Game.js";

test("discards player cards to bottom of discard pile", () => {
  const player: Player = {
    id: "player-id-001",
    userId: "user-id-001",
    username: "username-001",
    events: [],
    hand: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "drawTwo", color: "red", id: "card-id-002" },
      { type: "wild", isDrawFour: false, id: "card-id-003" },
    ],
    score: 0,
  };

  let game: Game = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "green", id: "card-id-004" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = discardLeavingPlayerCards(game, player);

  expect(game.discardPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "drawTwo", color: "red", id: "card-id-002" },
    expect.objectContaining({
      type: "discardedWild",
      card: { type: "wild", isDrawFour: false, id: "card-id-003" },
    }),
    { type: "number", value: 1, color: "green", id: "card-id-004" },
  ]);
});
