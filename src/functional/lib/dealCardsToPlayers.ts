import { dealCardToPlayer } from "./dealCardToPlayer.js";
import { INITIAL_HAND_SIZE } from "../constants.js";
import type { StartedGame } from "../types/Game.js";

export function dealCardsToPlayers(game: StartedGame): StartedGame {
  const playerIds = game.players.map((p) => p.id);

  Array.from({ length: INITIAL_HAND_SIZE }).forEach(() => {
    playerIds.forEach((playerId) => {
      game = dealCardToPlayer(game, playerId);
    });
  });

  return game;
}
