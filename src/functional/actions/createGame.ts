import { EXPIRY_EXTENSION_MS } from "../../constants.js";
import { CARDS } from "../constants.js";
import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

type CreateGameResult = {
  readonly game: Game;
  readonly playerId: string;
};

export function createGame(userId: string, username: string): CreateGameResult {
  const player: Player = {
    id: crypto.randomUUID(),
    userId,
    username,
    events: [],
    hand: [],
    score: 0,
  };

  const createdAt = Date.now();
  const game: Game = {
    id: crypto.randomUUID(),
    createdAt,
    expiresAt: createdAt + EXPIRY_EXTENSION_MS,
    status: "created",
    players: [player],
    drawPile: CARDS,
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
  };

  return { game, playerId: player.id };
}
