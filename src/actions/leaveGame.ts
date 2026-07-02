import { games } from "../games.js";

type LeaveGameResult =
  { success: true } | { success: false; error: LeaveGameError };

type LeaveGameError = "gameNotFound" | "playerNotFound";

export function leaveGame(gameId: string, playerId: string): LeaveGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  // TODO: Implement!
  return { success: true };
}
