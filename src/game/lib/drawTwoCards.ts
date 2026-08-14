import {
  emitEvent,
  emitEventToPlayer,
  requirePlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { takeCardsFromDrawPile } from "./takeCardsFromDrawPile.js";
import { addCardToHand } from "./addCardToHand.js";
import type { StartedGame } from "../types/Game.js";

export function drawTwoCards(game: StartedGame, playerId: string): StartedGame {
  const { player } = requirePlayer(game, playerId);

  const takeCardsResult = takeCardsFromDrawPile(game, 2);
  game = takeCardsResult.game;

  takeCardsResult.cards.forEach((card) => {
    game = updatePlayer(game, player.id, (p) => addCardToHand(p, card));
    game = emitEventToPlayer(game, player.id, { type: "drewCard", card });
  });

  game = emitEvent(game, {
    type: "playerDrewTwoCards",
    username: player.username,
  });

  return game;
}
