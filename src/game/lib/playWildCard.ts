import {
  emitEvent,
  emitEventToOtherPlayers,
  emitEventToPlayer,
  getCurrentPlayer,
  getNextPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { removeCardFromHand } from "./removeCardFromHand.js";
import { isOutOfCards } from "./isOutOfCards.js";
import { isGameWinner } from "./isGameWinner.js";
import { transitionGameToCompleted } from "./transitionGameToCompleted.js";
import { startRound } from "./startRound.js";
import { returnDiscardPile } from "./returnDiscardPile.js";
import { calculatePoints } from "./calculatePoints.js";
import { raiseScore } from "./raiseScore.js";
import { returnPlayerCards } from "./returnPlayerCards.js";
import { drawFourCards } from "./drawFourCards.js";
import { addWildCardToDiscardPile } from "./addWildCardToDiscardPile.js";
import { changeToNextPlayer } from "./changeToNextPlayer.js";
import { skipNextPlayer } from "./skipNextPlayer.js";
import type { Color, WildCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playWildCard(
  game: StartedGame,
  card: WildCard,
  color: Color,
): StartedGame | CompletedGame {
  const currentPlayer = getCurrentPlayer(game);

  game = updatePlayer(game, currentPlayer.id, (p) =>
    removeCardFromHand(p, card),
  );
  game = addWildCardToDiscardPile(game, card, color);

  game = emitEventToPlayer(game, currentPlayer.id, {
    type: "playerPlayedCard",
    card: { type: "discardedWild", card, color },
  });
  game = emitEventToOtherPlayers(game, currentPlayer.id, {
    type: "otherPlayerPlayedCard",
    username: currentPlayer.username,
    card: { type: "discardedWild", card, color },
  });

  if (card.isDrawFour) {
    const targetPlayer = getNextPlayer(game);
    game = drawFourCards(game, targetPlayer.id);
  }

  if (isOutOfCards(game, currentPlayer.id)) {
    game = raiseScore(game, currentPlayer.id, calculatePoints(game));
    game = returnPlayerCards(game);
    game = returnDiscardPile(game);

    const updatedCurrentPlayer = getCurrentPlayer(game);

    if (isGameWinner(game, currentPlayer.id)) {
      game = emitEventToPlayer(game, updatedCurrentPlayer.id, {
        type: "playerWonGame",
        score: updatedCurrentPlayer.score,
      });
      game = emitEventToOtherPlayers(game, updatedCurrentPlayer.id, {
        type: "otherPlayerWonGame",
        username: updatedCurrentPlayer.username,
        score: updatedCurrentPlayer.score,
      });
      game = emitEvent(game, { type: "gameCompleted" });
      return transitionGameToCompleted(game);
    } else {
      game = emitEventToPlayer(game, updatedCurrentPlayer.id, {
        type: "playerWonRound",
        score: updatedCurrentPlayer.score,
      });
      game = emitEventToOtherPlayers(game, updatedCurrentPlayer.id, {
        type: "otherPlayerWonRound",
        username: updatedCurrentPlayer.username,
        score: updatedCurrentPlayer.score,
      });
      game = startRound(game);
    }
  } else {
    if (card.isDrawFour) {
      if (game.players.length > 2) {
        game = skipNextPlayer(game);
      }
    } else {
      game = changeToNextPlayer(game);
    }
  }

  return game;
}
