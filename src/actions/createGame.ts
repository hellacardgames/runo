import { CARDS, EXPIRY_EXTENSION_MS, MAX_GAMES } from "../constants.js";
import { games } from "../games.js";
import { PlayerList } from "../lib/PlayerList.js";
import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

type CreateGameResult =
  | {
      readonly success: true;
      readonly gameId: string;
      readonly playerId: string;
    }
  | {
      readonly success: false;
      readonly error: "maxGamesReached";
    };

export function createGame(userId: string, username: string): CreateGameResult {
  if (games.size === MAX_GAMES) {
    return { success: false, error: "maxGamesReached" };
  }
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
    status: "open",
    id: crypto.randomUUID(),
    createdAt,
    expiresAt: createdAt + EXPIRY_EXTENSION_MS,
    chatMessages: [],
    playerList: new PlayerList<Player>(),
    drawPile: [...CARDS],
    discardPile: [],
  };
  game.playerList.add(player);
  games.set(game.id, game);
  return { success: true, gameId: game.id, playerId: player.id };
}
