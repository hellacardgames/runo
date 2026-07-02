import { games } from "../games.js";

type PlayCardResult =
  { success: true } | { success: false; error: PlayCardError };

type PlayCardError = "gameNotFound" | "playerNotFound" | "invalidStatus";

export function playCard(gameId: string, playerId: string): PlayCardResult {
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
