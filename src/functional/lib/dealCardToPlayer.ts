import { emitEvent } from "./emitEvent.js";
import { emitEventToPlayer } from "./emitEventToPlayer.js";
import { takeCardFromDrawPile } from "./takeCardFromDrawPile.js";
import { addCardToPlayerHand } from "./addCardToPlayerHand.js";
import type { StartedGame } from "../types/Game.js";
import type { Player } from "../types/Player.js";

export function dealCardToPlayer(
  game: StartedGame,
  player: Player,
): StartedGame {
  const takeCardResult = takeCardFromDrawPile(game);
  game = takeCardResult.game;
  const { card } = takeCardResult;
  game = addCardToPlayerHand(game, player, card);

  game = emitEventToPlayer(game, player, { type: "cardDealt", card });
  game = emitEvent(game, {
    type: "cardDealtToPlayer",
    username: player.username,
  });

  if (game.isReversed) {
    game = { ...game, isReversed: false };
    game = emitEvent(game, {
      type: "directionChanged",
      isReversed: game.isReversed,
    });
  }

  return game;
}
