import { games } from "../games.js";

type DrawCardResult =
  { success: true } | { success: false; error: DrawCardError };

type DrawCardError = "gameNotFound" | "playerNotFound" | "invalidStatus";

export function drawCard(gameId: string, playerId: string): DrawCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "active") {
    return { success: false, error: "invalidStatus" };
  }
  return { success: true };
}
