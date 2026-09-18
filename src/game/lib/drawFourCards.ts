import {
  emitEventToOtherPlayers,
  emitEventToPlayer,
  getPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { takeCardsFromDrawPile } from "./takeCardsFromDrawPile.js";
import { addCardToHand } from "./addCardToHand.js";
import type { StartedGame } from "../types/Game.js";

export function drawFourCards(
  game: StartedGame,
  playerId: string,
): StartedGame {
  const { player } = getPlayer(game, playerId);

  const takeCardsResult = takeCardsFromDrawPile(game, 4);
  game = takeCardsResult.game;

  takeCardsResult.cards.forEach((card) => {
    game = updatePlayer(game, player.id, (p) => addCardToHand(p, card));
  });

  game = emitEventToPlayer(game, player.id, {
    type: "playerDrewFourCards",
    cards: takeCardsResult.cards,
  });
  game = emitEventToOtherPlayers(game, player.id, {
    type: "otherPlayerDrewFourCards",
    username: player.username,
  });

  return game;
}
