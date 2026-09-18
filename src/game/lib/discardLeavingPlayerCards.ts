import { getPlayer, updatePlayer } from "@hellacardgames/lib";
import { removeCardFromHand } from "./removeCardFromHand.js";
import { addWildCardToBottomOfDiscardPile } from "./addWildCardToBottomOfDiscardPile.js";
import { addCardToBottomOfDiscardPile } from "./addCardToBottomOfDiscardPile.js";
import type { StartedGame } from "../types/Game.js";

export function discardLeavingPlayerCards(
  game: StartedGame,
  playerId: string,
): StartedGame {
  const { player } = getPlayer(game, playerId);

  const cards = player.hand.slice();

  for (const card of cards) {
    game = updatePlayer(game, player.id, (p) => removeCardFromHand(p, card));
    game =
      card.type === "wild"
        ? addWildCardToBottomOfDiscardPile(game, card, "red")
        : addCardToBottomOfDiscardPile(game, card);
  }

  return game;
}
