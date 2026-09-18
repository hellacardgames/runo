import {
  emitEvent,
  emitEventToOtherPlayers,
  emitEventToPlayer,
  isCurrentPlayer,
  tryGetPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { takeCardFromDrawPile } from "../lib/takeCardFromDrawPile.js";
import { hasPlayableCard } from "../lib/hasPlayableCard.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { addCardToHand } from "../lib/addCardToHand.js";
import { changeToNextPlayer } from "../lib/changeToNextPlayer.js";
import type { Game } from "../types/Game.js";

export function drawCard(game: Game, playerId: string) {
  const { player } = tryGetPlayer(game, playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" } as const;
  }
  if (!isCurrentPlayer(game, player.id)) {
    return { success: false, error: "outOfTurn" } as const;
  }
  if (hasPlayableCard(player.hand, game.discardPile)) {
    return { success: false, error: "hasPlayableCard" } as const;
  }

  const takeCardResult = takeCardFromDrawPile(game);
  const isPlayable = isCardPlayable(
    takeCardResult.card,
    player.hand,
    game.discardPile,
  );

  game = takeCardResult.game;
  game = updatePlayer(game, player.id, (p) =>
    addCardToHand(p, takeCardResult.card),
  );

  game = emitEventToPlayer(game, player.id, {
    type: "playerDrewCard",
    card: takeCardResult.card,
  });
  game = emitEventToOtherPlayers(game, player.id, {
    type: "otherPlayerDrewCard",
    username: player.username,
    isPlayable,
  });

  if (!isPlayable) {
    game = changeToNextPlayer(game);
  }

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  return { success: true, game } as const;
}
