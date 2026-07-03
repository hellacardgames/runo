import { games } from "../games.js";
import { MAX_PLAYERS } from "../constants.js";
import type { Player } from "../types/Player.js";

type JoinGameResult =
  | { success: true; playerId: string }
  | { success: false; error: JoinGameError };

type JoinGameError = "gameNotFound" | "invalidStatus" | "maxPlayersReached";

export function joinGame(gameId: string, name: string): JoinGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "open") {
    return { success: false, error: "invalidStatus" };
  }
  if (game.players.length === MAX_PLAYERS) {
    return { success: false, error: "maxPlayersReached" };
  }
  const player: Player = {
    id: crypto.randomUUID(),
    pid: crypto.randomUUID(),
    name,
    hand: [],
    roundsWon: 0,
    points: 0,
  };
  game.players.push(player);
  return {
    success: true,
    playerId: player.id,
  };
}
