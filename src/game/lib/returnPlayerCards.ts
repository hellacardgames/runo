import {
  emitEventToOtherPlayers,
  emitEventToPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import type { Card } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function returnPlayerCards(game: StartedGame): StartedGame {
  for (const player of game.players) {
    const cards = [...player.hand];
    let cardToReturn: Card | undefined;
    while ((cardToReturn = cards.pop())) {
      game = { ...game, drawPile: [...game.drawPile, cardToReturn] };
      game = emitEventToPlayer(game, player.id, {
        type: "playerReturnedCard",
        cardId: cardToReturn.id,
      });
      game = emitEventToOtherPlayers(game, player.id, {
        type: "otherPlayerReturnedCard",
        username: player.username,
      });
    }
    game = updatePlayer(game, player.id, (p) => ({ ...p, hand: cards }));
  }

  return game;
}
