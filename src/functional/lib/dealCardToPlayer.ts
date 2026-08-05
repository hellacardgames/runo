import { emitEvent } from "./emitEvent.js";
import { emitEventToPlayer } from "./emitEventToPlayer.js";
import { takeCardFromDrawPile } from "./takeCardFromDrawPile.js";
import { addCardToPlayerHand } from "./addCardToPlayerHand.js";
import { requirePlayer } from "./requirePlayer.js";
import type { StartedGame } from "../types/Game.js";

export function dealCardToPlayer(
  game: StartedGame,
  playerId: string,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  const takeCardResult = takeCardFromDrawPile(game);
  game = takeCardResult.game;
  const { card } = takeCardResult;
  game = addCardToPlayerHand(game, player.id, card);

  game = emitEventToPlayer(game, player.id, { type: "cardDealt", card });
  game = emitEvent(game, {
    type: "cardDealtToPlayer",
    username: player.username,
  });

  return game;
}
