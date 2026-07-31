import { games } from "../games.js";
import type { Color } from "../types/Card.js";

type PlayWildCardResult =
  { success: true } | { success: false; error: PlayWildCardError };

type PlayWildCardError =
  | "gameNotFound"
  | "playerNotFound"
  | "invalidStatus"
  | "outOfTurn"
  | "cardNotFound"
  | "cardNotWild";

export function playWildCard(
  gameId: string,
  playerId: string,
  cardId: string,
  color: Color,
): PlayWildCardResult {
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
  if (player !== game.players[game.currentPlayerIndex]) {
    return { success: false, error: "outOfTurn" };
  }
  const card = player.hand.find((c) => c.id === cardId);
  if (!card) {
    return { success: false, error: "cardNotFound" };
  }
  if (card.type !== "wild") {
    return { success: false, error: "cardNotWild" };
  }
  // TODO: Implement!
  console.log(color);
  return { success: true };
}
