import { emitEvent, isCurrentPlayer } from "@hellacardgames/lib";
import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { playDrawTwoCard } from "../lib/playDrawTwoCard.js";
import { playNumberCard } from "../lib/playNumberCard.js";
import { playReverseCard } from "../lib/playReverseCard.js";
import { playSkipCard } from "../lib/playSkipCard.js";
import type { StartedGame } from "../types/Game.js";

export function playCard(game: StartedGame, playerId: string, cardId: string) {
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
  if (card.type === "wild") {
    return { success: false, error: "cardIsWild" } as const;
  }
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" } as const;
  }

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  switch (card.type) {
    case "drawTwo":
      return { success: true, game: playDrawTwoCard(game, card) } as const;
    case "number":
      return { success: true, game: playNumberCard(game, card) } as const;
    case "reverse":
      return { success: true, game: playReverseCard(game, card) } as const;
    case "skip":
      return { success: true, game: playSkipCard(game, card) } as const;
  }
}
