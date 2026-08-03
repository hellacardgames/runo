import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { games } from "../games.js";
import { changeTurn } from "../lib/changeTurn.js";
import { drawCardFromDrawPile } from "../lib/drawCardFromDeck.js";
import { emitEvent } from "../lib/emitEvent.js";
import { emitEventToPlayer } from "../lib/emitEventToPlayer.js";
import { hasPlayableCard } from "../lib/hasPlayableCard.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";

type DrawCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "playerNotFound"
        | "invalidStatus"
        | "outOfTurn"
        | "hasPlayableCard";
    };

export function drawCard(gameId: string, playerId: string): DrawCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.players[game.currentPlayerIndex]) {
    return { success: false, error: "outOfTurn" };
  }
  if (hasPlayableCard(player.hand, game.discardPile)) {
    return { success: false, error: "hasPlayableCard" };
  }
  game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
  emitEvent(game, { type: "expirationUpdated", expiresAt: game.expiresAt });
  const card = drawCardFromDrawPile(game);
  player.hand.push(card);
  emitEventToPlayer(player, { type: "drewCard", card });
  const isPlayable = isCardPlayable(card, player.hand, game.discardPile);
  emitEvent(game, {
    type: "playerDrewCard",
    username: player.username,
    isPlayable,
  });
  if (!isPlayable) {
    changeTurn(game);
  }
  return { success: true };
}
