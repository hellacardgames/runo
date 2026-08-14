import { leaveGame as doLeaveGame } from "../../game/actions/leaveGame.js";
import { games } from "../games.js";

type LeaveGameResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound";
    }
  | DoLeaveGameError;

type DoLeaveGameError = Extract<DoLeaveGameResult, { success: false }>;

type DoLeaveGameResult = ReturnType<typeof doLeaveGame>;

export function leaveGame(gameId: string, playerId: string): LeaveGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }

  const result = doLeaveGame(game, playerId);
  if (!result.success) {
    return result;
  }

  if (result.game.players.length > 0) {
    games.set(gameId, result.game);
  } else {
    games.delete(gameId);
  }

  return { success: true };
}
