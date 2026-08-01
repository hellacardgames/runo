import { games } from "../games.js";
import { isCardPlayable } from "../utils/isCardPlayable.js";
import { shuffle } from "../utils/shuffle.js";

type DrawCardResult =
  { success: true } | { success: false; error: DrawCardError };

type DrawCardError =
  | "gameNotFound"
  | "playerNotFound"
  | "invalidStatus"
  | "outOfTurn"
  | "hasPlayableCard";

export function drawCard(gameId: string, playerId: string): DrawCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  // const player = game.players.find((p) => p.id === playerId);
  const player = game.playerList.findById(playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "active") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.playerList.currentPlayer) {
    return { success: false, error: "outOfTurn" };
  }
  for (const card of player.hand) {
    if (isCardPlayable(card, player.hand, game.discardPile)) {
      return { success: false, error: "hasPlayableCard" };
    }
  }
  if (game.drawPile.length === 0) {
    game.drawPile = game.discardPile
      .splice(0, game.discardPile.length - 1)
      .map((discardedCard) => {
        if (discardedCard.type === "discardedWild") {
          return discardedCard.card;
        } else {
          return discardedCard;
        }
      });
    shuffle(game.drawPile);
  }
  const card = game.drawPile.pop();
  if (!card) {
    throw new Error("Ran out of cards while drawing.");
  }
  player.hand.push(card);
  return { success: true };
}
