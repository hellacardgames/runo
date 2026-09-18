import {
  emitEvent,
  emitEventToOtherPlayers,
  emitEventToPlayer,
  getCurrentPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { removeCardFromHand } from "./removeCardFromHand.js";
import { addCardToDiscardPile } from "./addCardToDiscardPile.js";
import { isOutOfCards } from "./isOutOfCards.js";
import { isGameWinner } from "./isGameWinner.js";
import { transitionGameToCompleted } from "./transitionGameToCompleted.js";
import { startRound } from "./startRound.js";
import { returnDiscardPile } from "./returnDiscardPile.js";
import { calculatePoints } from "./calculatePoints.js";
import { raiseScore } from "./raiseScore.js";
import { returnPlayerCards } from "./returnPlayerCards.js";
import { skipNextPlayer } from "./skipNextPlayer.js";
import type { SkipCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playSkipCard(
  game: StartedGame,
  card: SkipCard,
): StartedGame | CompletedGame {
  const currentPlayer = getCurrentPlayer(game);

  game = updatePlayer(game, currentPlayer.id, (p) =>
    removeCardFromHand(p, card),
  );
  game = addCardToDiscardPile(game, card);

  game = emitEventToPlayer(game, currentPlayer.id, {
    type: "playerPlayedCard",
    card,
  });
  game = emitEventToOtherPlayers(game, currentPlayer.id, {
    type: "otherPlayerPlayedCard",
    username: currentPlayer.username,
    card,
  });

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
    if (game.players.length > 2) {
      game = skipNextPlayer(game);
    }
  }

  return game;
}
