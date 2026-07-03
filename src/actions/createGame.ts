import { games } from "../games.js";
import { MAX_GAMES } from "../constants.js";
import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

type CreateGameResult =
  | { success: true; gameId: string; playerId: string }
  | { success: false; error: CreateGameError };

type CreateGameError = "maxGamesReached";

export function createGame(name: string): CreateGameResult {
  if (games.size === MAX_GAMES) {
    return { success: false, error: "maxGamesReached" };
  }
  const player: Player = {
    id: crypto.randomUUID(),
    pid: crypto.randomUUID(),
    name,
    roundsWon: 0,
    points: 0,
  };
  const game: Game = {
    id: crypto.randomUUID(),
    status: "open",
    players: [player],
    currentPlayerIndex: 0,
  };
  games.set(game.id, game);
  return {
    success: true,
    gameId: game.id,
    playerId: player.id,
  };
}
