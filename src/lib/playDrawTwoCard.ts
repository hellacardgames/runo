import {
  emitEvent,
  getCurrentPlayer,
  getNextPlayer,
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
import { drawTwoCards } from "./drawTwoCards.js";
import { skipNextPlayer } from "./skipNextPlayer.js";
import type { DrawTwoCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playDrawTwoCard(
  game: StartedGame,
  card: DrawTwoCard,
): StartedGame | CompletedGame {
  const currentPlayer = getCurrentPlayer(game);

  game = updatePlayer(game, currentPlayer.id, (p) =>
    removeCardFromHand(p, card),
  );
  game = addCardToDiscardPile(game, card);
  game = emitEvent(game, {
    type: "cardPlayed",
    username: currentPlayer.username,
    card,
  });

  const targetPlayer = getNextPlayer(game);
  game = drawTwoCards(game, targetPlayer.id);

  if (isOutOfCards(game, currentPlayer.id)) {
    game = raiseScore(game, currentPlayer.id, calculatePoints(game));
    game = returnPlayerCards(game);
    game = returnDiscardPile(game);

    const updatedCurrentPlayer = getCurrentPlayer(game);

    if (isGameWinner(game, currentPlayer.id)) {
      game = emitEvent(game, {
        type: "playerWonGame",
        username: updatedCurrentPlayer.username,
        score: updatedCurrentPlayer.score,
      });
      game = emitEvent(game, { type: "gameCompleted" });
      return transitionGameToCompleted(game);
    } else {
      game = emitEvent(game, {
        type: "playerWonRound",
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
