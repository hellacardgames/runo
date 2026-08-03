import { EXPIRY_EXTENSION_MS, WINNING_SCORE } from "../constants.js";
import { games } from "../games.js";
import { changeTurn } from "../utils/changeTurn.js";
import { drawCardFromDrawPile } from "../utils/drawCardFromDeck.js";
import { getPointsForCard } from "../utils/getPointsForCard.js";
import { isCardPlayable } from "../utils/isCardPlayable.js";
import { startRound } from "../utils/startRound.js";
import type { Card } from "../types/Card.js";

type PlayCardResult =
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
        | "cardIsWild"
        | "cardNotPlayable";
    };

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
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.playerList.currentPlayer) {
    return { success: false, error: "outOfTurn" };
  }
  const cardIndex = player.hand.findIndex((c) => c.id === cardId);
  if (cardIndex === -1) {
    return { success: false, error: "cardNotFound" };
  }
  const card = player.hand[cardIndex]!;
  if (card.type === "wild") {
    return { success: false, error: "cardIsWild" };
  }
  if (!isCardPlayable(card, player.hand, game.discardPile)) {
    return { success: false, error: "cardNotPlayable" };
  }

  game.expiresAt = Date.now() + EXPIRY_EXTENSION_MS;
  // emitEvent(game, { type: "expirationUpdated", expiresAt: game.expiresAt });

  player.hand.splice(cardIndex, 1);
  game.discardPile.push(card);
  // emitEvent(game, { type: "cardPlayed", username: player.username, card });

  if (card.type === "reverse") {
    if (game.playerList.length > 2) {
      game.playerList.changeDirection();
      // emitEvent(game, {
      //   type: "directionChanged",
      //   isReversed: game.isReversed,
      // });
    } else {
      changeTurn(game);
    }
  } else if (card.type === "skip") {
    changeTurn(game);
  } else if (card.type === "drawTwo") {
    changeTurn(game);
    // const targetPlayer = game.players[game.currentPlayerIndex]!;
    const targetPlayer = game.playerList.currentPlayer;
    const cards: Card[] = [];
    cards.push(drawCardFromDrawPile(game));
    cards.push(drawCardFromDrawPile(game));
    for (const c of cards) {
      targetPlayer.hand.push(c);
      // emitEventToPlayer(targetPlayer, { type: "drewCard", card: c });
    }
    // emitEvent(game, {
    //   type: "playerDrewTwoCards",
    //   username: targetPlayer.username,
    // });
  }

  if (player.hand.length === 0) {
    let cardToReturn: Card | undefined;
    for (const p of game.playerList) {
      while ((cardToReturn = p.hand.pop())) {
        player.score += getPointsForCard(cardToReturn);
        game.drawPile.push(cardToReturn);
        // emitEventToPlayer(p, { type: "returnedCard", cardId: cardToReturn.id });
        // emitEvent(game, { type: "playerReturnedCard", username: p.username });
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
    // emitEvent(game, { type: "discardPileReturned" });

    if (player.score >= WINNING_SCORE) {
      // emitEvent(game, {
      //   type: "playerWonGame",
      //   username: player.username,
      //   score: player.score,
      // });
      // emitEvent(game, { type: "gameCompleted" });
      game.status = "completed";
    } else {
      // emitEvent(game, {
      //   type: "playerWonRound",
      //   username: player.username,
      //   score: player.score,
      // });
      if (game.playerList.currentPlayer !== player) {
        game.playerList.currentPlayer = player;
        // emitEvent(game, {
        //   type: "turnChanged",
        //   currentPlayerUsername: player.username,
        // });
      }
      startRound(game);
    }
  } else {
    changeTurn(game);
  }

  return { success: true };
}
