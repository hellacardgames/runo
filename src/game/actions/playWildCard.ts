import { emitEvent, isCurrentPlayer } from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { playWildCard as doPlayWildCard } from "../lib/playWildCard.js";
import type { Color } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function playWildCard(
  game: StartedGame,
  playerId: string,
  cardId: string,
  color: Color,
) {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (!isCurrentPlayer(game, player.id)) {
    return { success: false, error: "outOfTurn" } as const;
  }
  const card = player.hand.find((c) => c.id === cardId);
  if (!card) {
    return { success: false, error: "cardNotFound" } as const;
  }
  if (card.type !== "wild") {
    return { success: false, error: "cardNotWild" } as const;
  }
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" } as const;
  }

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  return {
    success: true,
    game: doPlayWildCard(game, card, color),
  } as const;
}
