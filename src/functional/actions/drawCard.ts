import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { addCardToPlayerHand } from "../lib/addCardToPlayerHand.js";
import { changeTurn } from "../lib/changeTurn.js";
import { takeCardFromDrawPile } from "../lib/takeCardFromDrawPile.js";
import { emitEvent } from "../lib/emitEvent.js";
import { emitEventToPlayer } from "../lib/emitEventToPlayer.js";
import { hasPlayableCard } from "../lib/hasPlayableCard.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { getCurrentPlayer } from "../lib/getCurrentPlayer.js";
import type { StartedGame } from "../types/Game.js";
import { isCurrentPlayer } from "../lib/isCurrentPlayer.js";

type DrawCardResult =
  | {
      readonly success: true;
      readonly game: StartedGame;
    }
  | {
      readonly success: false;
      readonly error: "playerNotFound" | "outOfTurn" | "hasPlayableCard";
    };

export function drawCard(game: StartedGame, playerId: string): DrawCardResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (!isCurrentPlayer(game, player.id)) {
    return { success: false, error: "outOfTurn" };
  }
  if (hasPlayableCard(player.hand, game.discardPile)) {
    return { success: false, error: "hasPlayableCard" };
  }

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  const takeCardResult = takeCardFromDrawPile(game);
  game = takeCardResult.game;
  const { card } = takeCardResult;
  game = addCardToPlayerHand(game, player.id, card);
  game = emitEventToPlayer(game, player.id, { type: "drewCard", card });

  const isPlayable = isCardPlayable(card, player.hand, game.discardPile);
  game = emitEvent(game, {
    type: "playerDrewCard",
    username: player.username,
    isPlayable,
  });

  if (!isPlayable) {
    game = changeTurn(game);
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: getCurrentPlayer(game).username,
    });
  }

  return { success: true, game };
}
