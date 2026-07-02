import { MIN_PLAYERS } from "../constants.js";
import { games } from "../games.js";

type StartGameResult =
  { success: true } | { success: false; error: StartGameError };

type StartGameError =
  "gameNotFound" | "playerNotFound" | "invalidStatus" | "minPlayersNotReached";

export function startGame(gameId: string, playerId: string): StartGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "open") {
    return { success: false, error: "invalidStatus" };
  }
  if (game.players.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" };
  }
  game.status = "active";
  return { success: true };
}
