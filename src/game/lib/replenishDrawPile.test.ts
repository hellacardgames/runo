import { expect, test, vi } from "vitest";
import { EXPIRY_EXTENSION_MS } from "../constants.js";

vi.mock(import("@hellacardgames/lib"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    shuffle: <T>(cards: readonly T[]) => [...cards].reverse(),
  };
});

import { replenishDrawPile } from "./replenishDrawPile.js";
import type { StartedGame } from "../types/Game.js";

test("takes all discarded cards except for top card", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
      { type: "number", value: 1, color: "red", id: "card-id-004" },
      { type: "number", value: 1, color: "red", id: "card-id-005" },
      { type: "number", value: 1, color: "red", id: "card-id-006" },
      { type: "number", value: 1, color: "red", id: "card-id-007" },
      { type: "number", value: 1, color: "red", id: "card-id-008" },
      { type: "number", value: 1, color: "red", id: "card-id-009" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };
  game = replenishDrawPile(game);
  expect(game.discardPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-009" },
  ]);
  const drawPileSorted = [...game.drawPile].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
  expect(drawPileSorted).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-001" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-004" },
    { type: "number", value: 1, color: "red", id: "card-id-005" },
    { type: "number", value: 1, color: "red", id: "card-id-006" },
    { type: "number", value: 1, color: "red", id: "card-id-007" },
    { type: "number", value: 1, color: "red", id: "card-id-008" },
  ]);
});

test("unwraps discarded wild cards", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      {
        type: "discardedWild",
        color: "red",
        card: { type: "wild", isDrawFour: false, id: "card-id-001" },
      },
      {
        type: "discardedWild",
        color: "red",
        card: { type: "wild", isDrawFour: true, id: "card-id-002" },
      },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };
  game = replenishDrawPile(game);
  const drawPileSorted = [...game.drawPile].sort((a, b) =>
    a.id.localeCompare(b.id),
  );
  expect(drawPileSorted).toEqual([
    { type: "wild", isDrawFour: false, id: "card-id-001" },
    { type: "wild", isDrawFour: true, id: "card-id-002" },
  ]);
});

test("shuffles draw pile after replenishing", () => {
  let game: StartedGame = {
    id: "game-id-001",
    createdAt: Date.now(),
    expiresAt: Date.now() + EXPIRY_EXTENSION_MS,
    status: "started",
    players: [],
    drawPile: [],
    discardPile: [
      { type: "number", value: 1, color: "red", id: "card-id-001" },
      { type: "number", value: 1, color: "red", id: "card-id-002" },
      { type: "number", value: 1, color: "red", id: "card-id-003" },
      { type: "number", value: 1, color: "red", id: "card-id-004" },
      { type: "number", value: 1, color: "red", id: "card-id-005" },
      { type: "number", value: 1, color: "red", id: "card-id-006" },
      { type: "number", value: 1, color: "red", id: "card-id-007" },
      { type: "number", value: 1, color: "red", id: "card-id-008" },
      { type: "number", value: 1, color: "red", id: "card-id-009" },
    ],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };
  game = replenishDrawPile(game);
  expect(game.drawPile).toEqual([
    { type: "number", value: 1, color: "red", id: "card-id-008" },
    { type: "number", value: 1, color: "red", id: "card-id-007" },
    { type: "number", value: 1, color: "red", id: "card-id-006" },
    { type: "number", value: 1, color: "red", id: "card-id-005" },
    { type: "number", value: 1, color: "red", id: "card-id-004" },
    { type: "number", value: 1, color: "red", id: "card-id-003" },
    { type: "number", value: 1, color: "red", id: "card-id-002" },
    { type: "number", value: 1, color: "red", id: "card-id-001" },
  ]);
});
