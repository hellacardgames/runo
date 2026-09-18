import {
  emitEventToOtherPlayers,
  emitEventToPlayer,
  getPlayer,
  updatePlayer,
} from "@hellacardgames/lib";
import { takeCardFromDrawPile } from "./takeCardFromDrawPile.js";
import { addCardToHand } from "./addCardToHand.js";
import type { StartedGame } from "../types/Game.js";

export function dealCardToPlayer(
  game: StartedGame,
  playerId: string,
): StartedGame {
  const { player } = getPlayer(game, playerId);

  const takeCardResult = takeCardFromDrawPile(game);
  game = takeCardResult.game;
  game = updatePlayer(game, player.id, (p) =>
    addCardToHand(p, takeCardResult.card),
  );

  game = emitEventToPlayer(game, player.id, {
    type: "playerCardDealt",
    card: takeCardResult.card,
  });
  game = emitEventToOtherPlayers(game, player.id, {
    type: "otherPlayerCardDealt",
    username: player.username,
  });

  return game;
}
