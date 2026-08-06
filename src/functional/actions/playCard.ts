import { EXPIRY_EXTENSION_MS } from "../constants.js";
import { addCardToDiscardPile } from "../lib/addCardToDiscardPile.js";
import { emitEvent } from "../lib/emitEvent.js";
import { isCardPlayable } from "../lib/isCardPlayable.js";
import { isCurrentPlayer } from "../lib/isCurrentPlayer.js";
import { removeCardFromHand } from "../lib/removeCardFromHand.js";
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

  return { success: true, game };

  // if (card.type === "reverse") {
  //   if (game.players.length > 2) {
  //     game.isReversed = !game.isReversed;
  //     emitEvent(game, {
  //       type: "directionChanged",
  //       isReversed: game.isReversed,
  //     });
  //   } else {
  //     changeTurn(game);
  //     emitEvent(game, {
  //       type: "turnChanged",
  //       currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
  //     });
  //   }
  // } else if (card.type === "skip") {
  //   changeTurn(game);
  //   emitEvent(game, {
  //     type: "turnChanged",
  //     currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
  //   });
  // } else if (card.type === "drawTwo") {
  //   changeTurn(game);
  //   emitEvent(game, {
  //     type: "turnChanged",
  //     currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
  //   });
  //   const targetPlayer = game.players[game.currentPlayerIndex]!;
  //   const cards: Card[] = [];
  //   cards.push(drawCardFromDrawPile(game));
  //   cards.push(drawCardFromDrawPile(game));
  //   for (const c of cards) {
  //     targetPlayer.hand.push(c);
  //     emitEventToPlayer(targetPlayer, { type: "drewCard", card: c });
  //   }
  //   emitEvent(game, {
  //     type: "playerDrewTwoCards",
  //     username: targetPlayer.username,
  //   });
  // }

  // if (player.hand.length === 0) {
  //   let cardToReturn: Card | undefined;
  //   for (const p of game.players) {
  //     while ((cardToReturn = p.hand.pop())) {
  //       player.score += getPointsForCard(cardToReturn);
  //       game.drawPile.push(cardToReturn);
  //       emitEventToPlayer(p, { type: "returnedCard", cardId: cardToReturn.id });
  //       emitEvent(game, { type: "playerReturnedCard", username: p.username });
  //     }
  //   }
  //   const discardsToReturn = game.discardPile.splice(
  //     0,
  //     game.discardPile.length,
  //   );
  //   game.drawPile.push(
  //     ...discardsToReturn.map((c) => {
  //       if (c.type === "discardedWild") {
  //         return c.card;
  //       }
  //       return c;
  //     }),
  //   );
  //   emitEvent(game, { type: "discardPileReturned" });

  //   if (player.score >= WINNING_SCORE) {
  //     emitEvent(game, {
  //       type: "playerWonGame",
  //       username: player.username,
  //       score: player.score,
  //     });
  //     emitEvent(game, { type: "gameCompleted" });
  //     game.status = "completed";
  //   } else {
  //     emitEvent(game, {
  //       type: "playerWonRound",
  //       username: player.username,
  //       score: player.score,
  //     });
  //     const currentPlayer = game.players[game.currentPlayerIndex]!;
  //     if (currentPlayer !== player) {
  //       game.currentPlayerIndex = game.players.indexOf(player);
  //       emitEvent(game, {
  //         type: "turnChanged",
  //         currentPlayerUsername: player.username,
  //       });
  //     }
  //     startRound(game);
  //   }
  // } else {
  //   changeTurn(game);
  //   emitEvent(game, {
  //     type: "turnChanged",
  //     currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
  //   });
  // }

  // return { success: true };
}
