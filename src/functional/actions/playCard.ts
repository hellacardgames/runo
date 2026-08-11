import { EXPIRY_EXTENSION_MS, WINNING_SCORE } from "../constants.js";
import { addCardToDiscardPile } from "../lib/addCardToDiscardPile.js";
import { addCardToHand } from "../lib/addCardToHand.js";
import { changeTurn } from "../lib/changeTurn.js";
import { emitEvent } from "../lib/emitEvent.js";
import { emitEventToPlayer } from "../lib/emitEventToPlayer.js";
import { getCurrentPlayer } from "../lib/getCurrentPlayer.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { isCurrentPlayer } from "../lib/isCurrentPlayer.js";
import { removeCardFromHand } from "../lib/removeCardFromHand.js";
import { requirePlayer } from "../lib/requirePlayer.js";
import { startRound } from "../lib/startRound.js";
import { takeCardsFromDrawPile } from "../lib/takeCardsFromDrawPile.js";
import { updatePlayer } from "../lib/updatePlayer.js";
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

  game = updatePlayer(game, player.id, (p) => removeCardFromHand(p, card));
  game = addCardToDiscardPile(game, card);
  game = emitEvent(game, {
    type: "cardPlayed",
    username: player.username,
    card,
  });

  if (card.type === "reverse") {
    if (game.players.length > 2) {
      const isReversed = !game.isReversed;
      game = { ...game, isReversed };
      game = emitEvent(game, { type: "directionChanged", isReversed });
    } else {
      game = changeTurn(game);
      game = emitEvent(game, {
        type: "turnChanged",
        currentPlayerUsername: getCurrentPlayer(game).username,
      });
    }
  } else if (card.type === "skip") {
    game = changeTurn(game);
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: getCurrentPlayer(game).username,
    });
  } else if (card.type === "drawTwo") {
    game = changeTurn(game);
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: getCurrentPlayer(game).username,
    });
    const targetPlayer = getCurrentPlayer(game);
    const takeCardsResult = takeCardsFromDrawPile(game, 2);
    game = takeCardsResult.game;
    takeCardsResult.cards.forEach((c) => {
      game = updatePlayer(game, targetPlayer.id, (p) => addCardToHand(p, c));
      game = emitEventToPlayer(game, targetPlayer.id, {
        type: "drewCard",
        card: c,
      });
    });
    game = emitEvent(game, {
      type: "playerDrewTwoCards",
      username: targetPlayer.username,
    });
  }

  if (player.hand.length === 0) {
    // let cardToReturn: Card | undefined;
    // for (const p of game.players) {
    //   while ((cardToReturn = p.hand.pop())) {
    //     player.score += getPointsForCard(cardToReturn);
    //     game.drawPile.push(cardToReturn);
    //     emitEventToPlayer(p, { type: "returnedCard", cardId: cardToReturn.id });
    //     emitEvent(game, { type: "playerReturnedCard", username: p.username });
    //   }
    // }
    // const discardsToReturn = game.discardPile.splice(
    //   0,
    //   game.discardPile.length,
    // );
    // game.drawPile.push(
    //   ...discardsToReturn.map((c) => {
    //     if (c.type === "discardedWild") {
    //       return c.card;
    //     }
    //     return c;
    //   }),
    // );
    game = emitEvent(game, { type: "discardPileReturned" });
    if (player.score >= WINNING_SCORE) {
      game = emitEvent(game, {
        type: "playerWonGame",
        username: player.username,
        score: player.score,
      });
      game = emitEvent(game, { type: "gameCompleted" });
      // game.status = "completed";
    } else {
      game = emitEvent(game, {
        type: "playerWonRound",
        username: player.username,
        score: player.score,
      });
      if (!isCurrentPlayer(game, player.id)) {
        const { index } = requirePlayer(game, player.id);
        game = { ...game, currentPlayerIndex: index };
        game = emitEvent(game, {
          type: "turnChanged",
          currentPlayerUsername: player.username,
        });
      }
      game = startRound(game);
    }
  } else {
    game = changeTurn(game);
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: getCurrentPlayer(game).username,
    });
  }

  return { success: true, game };
}
