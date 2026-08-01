import { games } from "../games.js";
import { isCardPlayable } from "../utils/isCardPlayable.js";

type PlayCardResult =
  { success: true } | { success: false; error: PlayCardError };

type PlayCardError =
  | "gameNotFound"
  | "playerNotFound"
  | "invalidStatus"
  | "outOfTurn"
  | "cardNotFound"
  | "cardIsWild"
  | "cardNotPlayable";

export function playCard(
  gameId: string,
  playerId: string,
  cardId: string,
): PlayCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.playerList.findById(playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "active") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.playerList.currentPlayer) {
    return { success: false, error: "outOfTurn" };
  }
  const card = player.hand.find((c) => c.id === cardId);
  if (!card) {
    return { success: false, error: "cardNotFound" };
  }
  if (card.type === "wild") {
    return { success: false, error: "cardIsWild" };
  }
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" };
  }
  // TODO: Implement!
  return { success: true };
}
