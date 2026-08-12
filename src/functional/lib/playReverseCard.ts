import { updatePlayer } from "./updatePlayer.js";
import { removeCardFromHand } from "./removeCardFromHand.js";
import { addCardToDiscardPile } from "./addCardToDiscardPile.js";
import { emitEvent } from "./emitEvent.js";
import { isOutOfCards } from "./isOutOfCards.js";
import { isGameWinner } from "./isGameWinner.js";
import { transitionGameToCompleted } from "./transitionGameToCompleted.js";
import { startRound } from "./startRound.js";
import { returnDiscardPile } from "./returnDiscardPile.js";
import { calculatePoints } from "./calculatePoints.js";
import { raiseScore } from "./raiseScore.js";
import { returnPlayerCards } from "./returnPlayerCards.js";
import { getCurrentPlayer } from "./getCurrentPlayer.js";
import { changeToNextPlayer } from "./changeToNextPlayer.js";
import type { ReverseCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playReverseCard(
  game: StartedGame,
  card: ReverseCard,
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
      const isReversed = !game.isReversed;
      game = { ...game, isReversed };
      game = emitEvent(game, { type: "directionChanged", isReversed });

      game = changeToNextPlayer(game);
    }
  }

  return game;
}
