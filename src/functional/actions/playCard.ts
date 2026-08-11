import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { emitEvent } from "../lib/emitEvent.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { isCurrentPlayer } from "../lib/isCurrentPlayer.js";
import { playDrawTwoCard } from "../lib/playDrawTwoCard.js";
import { playNumberCard } from "../lib/playNumberCard.js";
import { playReverseCard } from "../lib/playReverseCard.js";
import { playSkipCard } from "../lib/playSkipCard.js";
import type {
  CompletedGame,
  ForfeitedGame,
  StartedGame,
} from "../types/Game.js";

type PlayCardResult =
  | {
      readonly success: true;
      readonly game: StartedGame | ForfeitedGame | CompletedGame;
    }
  | {
      readonly success: false;
      readonly error:
        | "playerNotFound"
        | "outOfTurn"
        | "cardNotFound"
        | "cardIsWild"
        | "cardNotPlayable";
    };

export function playCard(
  game: StartedGame,
  playerId: string,
  cardId: string,
): PlayCardResult {
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
  if (card.type === "wild") {
    return { success: false, error: "cardIsWild" };
  }
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" };
  }

  game = { ...game, expiresAt: Date.now() + EXPIRY_EXTENSION_MS };
  game = emitEvent(game, {
    type: "expirationUpdated",
    expiresAt: game.expiresAt,
  });

  switch (card.type) {
    case "drawTwo":
      game = playDrawTwoCard(game, player.id, card);
      break;
    case "number":
      game = playNumberCard(game, player.id, card);
      break;
    case "reverse":
      game = playReverseCard(game, player.id, card);
      break;
    case "skip":
      game = playSkipCard(game, player.id, card);
      break;
  }

  return { success: true, game };
}
