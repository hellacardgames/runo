import { expect, test } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { returnDiscardPile } from "./returnDiscardPile.js";
import type { StartedGame } from "../types/Game.js";

test("returns discarded cards to draw pile", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [
      { type: "number", value: 2, color: "yellow", id: "card-id-072" },
      { type: "number", value: 7, color: "yellow", id: "card-id-001" },
    ],
    discardPile: [
      { type: "number", value: 9, color: "red", id: "card-id-009" },
      { type: "drawTwo", color: "red", id: "card-id-002" },
      { type: "reverse", color: "green", id: "card-id-019" },
      {
        type: "discardedWild",
        card: { type: "wild", isDrawFour: false, id: "card-id-006" },
        color: "yellow",
      },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = returnDiscardPile(game);

  const drawPileSorted = game.drawPile
    .slice()
    .sort((a, b) => a.id.localeCompare(b.id));

  expect(drawPileSorted).toEqual([
    { type: "number", value: 7, color: "yellow", id: "card-id-001" },
    { type: "drawTwo", color: "red", id: "card-id-002" },
    { type: "wild", isDrawFour: false, id: "card-id-006" },
    { type: "number", value: 9, color: "red", id: "card-id-009" },
    { type: "reverse", color: "green", id: "card-id-019" },
    { type: "number", value: 2, color: "yellow", id: "card-id-072" },
  ]);
});

test("does nothing when discard pile is empty", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [
      { type: "number", value: 2, color: "yellow", id: "card-id-072" },
      { type: "number", value: 7, color: "yellow", id: "card-id-001" },
    ],
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  game = returnDiscardPile(game);

  expect(game.drawPile).toEqual([
    { type: "number", value: 2, color: "yellow", id: "card-id-072" },
    { type: "number", value: 7, color: "yellow", id: "card-id-001" },
  ]);
});
