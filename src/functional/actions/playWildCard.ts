import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { emitEvent } from "../lib/emitEvent.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { isCurrentPlayer } from "../lib/isCurrentPlayer.js";
import { playWildCard as doPlayWildCard } from "../lib/playWildCard.js";
import type { Color } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

type PlayWildCardResult =
  | {
      readonly success: true;
      readonly game: StartedGame | CompletedGame;
    }
  | {
      readonly success: false;
      readonly error:
        | "playerNotFound"
        | "outOfTurn"
        | "cardNotFound"
        | "cardNotWild"
        | "cardNotPlayable";
    };

export function playWildCard(
  game: StartedGame,
  playerId: string,
  cardId: string,
  color: Color,
): PlayWildCardResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (isCurrentPlayer(game, player.id)) {
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

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  return {
    success: true,
    game: doPlayWildCard(game, card, color),
  };
}
