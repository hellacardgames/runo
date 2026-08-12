import { takeCardsFromDrawPile } from "./takeCardsFromDrawPile.js";
import { updatePlayer } from "./updatePlayer.js";
import { addCardToHand } from "./addCardToHand.js";
import { emitEventToPlayer } from "./emitEventToPlayer.js";
import { emitEvent } from "./emitEvent.js";
import { requirePlayer } from "./requirePlayer.js";
import type { StartedGame } from "../types/Game.js";

export function drawFourCards(
  game: StartedGame,
  playerId: string,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  const takeCardsResult = takeCardsFromDrawPile(game, 4);
  game = takeCardsResult.game;

  takeCardsResult.cards.forEach((card) => {
    game = updatePlayer(game, player.id, (p) => addCardToHand(p, card));
    game = emitEventToPlayer(game, player.id, { type: "drewCard", card });
  });

  game = emitEvent(game, {
    type: "playerDrewFourCards",
    username: player.username,
  });

  return game;
}
