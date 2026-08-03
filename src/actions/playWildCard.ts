import { EXPIRY_EXTENSION_MS, WINNING_SCORE } from "../constants.js";
import { games } from "../games.js";
import { changeTurn } from "../lib/changeTurn.js";
import { drawCardFromDrawPile } from "../lib/drawCardFromDeck.js";
import { emitEvent } from "../lib/emitEvent.js";
import { emitEventToPlayer } from "../lib/emitEventToPlayer.js";
import { getPointsForCard } from "../lib/getPointsForCard.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { startRound } from "../lib/startRound.js";
import type { Card, Color, DiscardedCard } from "../types/Card.js";

type PlayWildCardResult =
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
        | "cardNotFound"
        | "cardNotWild"
        | "cardNotPlayable";
    };

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
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.players[game.currentPlayerIndex]) {
    return { success: false, error: "outOfTurn" };
  }
  const cardIndex = player.hand.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) {
    return { success: false, error: "cardNotFound" };
  }
  const card = player.hand[cardIndex]!;
  if (card.type !== "wild") {
    return { success: false, error: "cardNotWild" };
  }
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" };
  }

  game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
  emitEvent(game, { type: "expirationUpdated", expiresAt: game.expiresAt });

  player.hand.splice(cardIndex, 1);
  const discardedCard: DiscardedCard = {
    type: "discardedWild",
    card,
    color,
  };
  game.discardPile.push(discardedCard);
  emitEvent(game, {
    type: "cardPlayed",
    username: player.username,
    card: discardedCard,
  });

  if (card.isDrawFour) {
    changeTurn(game);
    emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
    });
    const targetPlayer = game.players[game.currentPlayerIndex]!;
    const cards: Card[] = [];
    cards.push(drawCardFromDrawPile(game));
    cards.push(drawCardFromDrawPile(game));
    cards.push(drawCardFromDrawPile(game));
    cards.push(drawCardFromDrawPile(game));
    for (const c of cards) {
      targetPlayer.hand.push(c);
      emitEventToPlayer(targetPlayer, { type: "drewCard", card: c });
    }
    emitEvent(game, {
      type: "playerDrewFourCards",
      username: targetPlayer.username,
    });
  }

  if (player.hand.length === 0) {
    let cardToReturn: Card | undefined;
    for (const p of game.players) {
      while ((cardToReturn = p.hand.pop())) {
        player.score += getPointsForCard(cardToReturn);
        game.drawPile.push(cardToReturn);
        emitEventToPlayer(p, { type: "returnedCard", cardId: cardToReturn.id });
        emitEvent(game, { type: "playerReturnedCard", username: p.username });
      }
    }
    const discardsToReturn = game.discardPile.splice(
      0,
      game.discardPile.length,
    );
    game.drawPile.push(
      ...discardsToReturn.map((c) => {
        if (c.type === "discardedWild") {
          return c.card;
        }
        return c;
      }),
    );
    emitEvent(game, { type: "discardPileReturned" });

    if (player.score >= WINNING_SCORE) {
      emitEvent(game, {
        type: "playerWonGame",
        username: player.username,
        score: player.score,
      });
      emitEvent(game, { type: "gameCompleted" });
      game.status = "completed";
    } else {
      emitEvent(game, {
        type: "playerWonRound",
        username: player.username,
        score: player.score,
      });
      const currentPlayer = game.players[game.currentPlayerIndex]!;
      if (currentPlayer !== player) {
        game.currentPlayerIndex = game.players.indexOf(player);
        emitEvent(game, {
          type: "turnChanged",
          currentPlayerUsername: player.username,
        });
      }
      startRound(game);
    }
  } else {
    changeTurn(game);
    emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
    });
  }

  return { success: true };
}
