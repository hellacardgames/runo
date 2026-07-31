import { games } from "../games.js";
import type { Color } from "../types/Card.js";
import { isCardPlayable } from "../utils/isCardPlayable.js";

type PlayWildCardResult =
  { success: true } | { success: false; error: PlayWildCardError };

type PlayWildCardError =
  | "gameNotFound"
  | "playerNotFound"
  | "invalidStatus"
  | "outOfTurn"
  | "cardNotFound"
  | "cardNotWild"
  | "cardNotPlayable";

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
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" };
  }
  // TODO: Implement!
  console.log(color);
  return { success: true };
}
