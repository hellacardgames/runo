import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { CARDS } from "../constants.js";
import type { CreatedGame } from "../types/Game.js";
import type { Player } from "../types/Player.js";

export function createGame(userId: string, username: string) {
  const player: Player = {
    id: crypto.randomUUID(),
    userId,
    username,
    events: [],
    hand: [],
    score: 0,
  };

  const createdAt = Date.now();
  const game: CreatedGame = {
    id: crypto.randomUUID(),
    createdAt,
    expiresAt: createdAt + EXPIRY_EXTENSION_MS,
    status: "created",
    players: [player],
    drawPile: CARDS,
    discardPile: [],
    currentPlayerIndex: 0,
    isReversed: false,
    chatMessages: [],
  };

  return { game, playerId: player.id } as const;
}
