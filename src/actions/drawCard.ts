import { games } from "../games.js";
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
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (game.status !== "active") {
    return { success: false, error: "invalidStatus" };
  }
  if (player !== game.players[game.currentPlayerIndex]) {
    return { success: false, error: "outOfTurn" };
  }
  // TODO: Check if player has playable card.
  if (game.drawPile.length === 0) {
    game.drawPile = game.discardPile.splice(0, game.discardPile.length - 1);
    shuffle(game.drawPile);
  }
  const card = game.drawPile.pop();
  if (!card) {
    throw new Error("Ran out of cards while drawing.");
  }
  player.hand.push(card);
  return { success: true };
}
