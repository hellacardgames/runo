import { requirePlayer } from "./requirePlayer.js";
import { updatePlayer } from "./updatePlayer.js";
import { removeCardFromHand } from "./removeCardFromHand.js";
import { addCardToDiscardPile } from "./addCardToDiscardPile.js";
import { emitEvent } from "./emitEvent.js";
import { isOutOfCards } from "./isOutOfCards.js";
import { isGameWinner } from "./isGameWinner.js";
import { transitionGameToCompleted } from "./transitionGameToCompleted.js";
import { changeTurn } from "./changeTurn.js";
import { startRound } from "./startRound.js";
import { returnDiscardPile } from "./returnDiscardPile.js";
import { calculatePoints } from "./calculatePoints.js";
import { raiseScore } from "./raiseScore.js";
import { returnPlayerCards } from "./returnPlayerCards.js";
import { getCurrentPlayer } from "./getCurrentPlayer.js";
import type { NumberCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playNumberCard(
  game: StartedGame,
  card: NumberCard,
): StartedGame | CompletedGame {
  const player = getCurrentPlayer(game);

  game = updatePlayer(game, player.id, (p) => removeCardFromHand(p, card));
  game = addCardToDiscardPile(game, card);
  game = emitEvent(game, {
    type: "cardPlayed",
    username: player.username,
    card,
  });

  if (isOutOfCards(game, player.id)) {
    game = raiseScore(game, player.id, calculatePoints(game));
    game = returnPlayerCards(game);
    game = returnDiscardPile(game);

    const { player: updatedPlayer } = requirePlayer(game, player.id);

    if (isGameWinner(game, player.id)) {
      game = emitEvent(game, {
        type: "playerWonGame",
        username: updatedPlayer.username,
        score: updatedPlayer.score,
      });
      game = emitEvent(game, { type: "gameCompleted" });
      return transitionGameToCompleted(game);
    } else {
      const { player: updatedPlayer } = requirePlayer(game, player.id);
      game = emitEvent(game, {
        type: "playerWonRound",
        username: updatedPlayer.username,
        score: updatedPlayer.score,
      });
      game = startRound(game);
    }
  } else {
    game = changeTurn(game);
    game = emitEvent(game, {
      type: "turnChanged",
      currentPlayerUsername: getCurrentPlayer(game).username,
    });
  }

  return game;
}
