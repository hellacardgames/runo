import {
  emitEvent,
  emitEventToPlayer,
  requirePlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { takeCardFromDrawPile } from "./takeCardFromDrawPile.js";
import { addCardToHand } from "./addCardToHand.js";
import type { StartedGame } from "../types/Game.js";

export function dealCardToPlayer(
  game: StartedGame,
  playerId: string,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  const takeCardResult = takeCardFromDrawPile(game);
  game = takeCardResult.game;
  game = updatePlayer(game, player.id, (p) =>
    addCardToHand(p, takeCardResult.card),
  );

  game = emitEventToPlayer(game, player.id, {
    type: "cardDealt",
    card: takeCardResult.card,
  });
  game = emitEvent(game, {
    type: "cardDealtToPlayer",
    username: player.username,
  });

  return game;
}
