import { INITIAL_HAND_SIZE } from "../constants.js";
import { dealCardToPlayer } from "./dealCardToPlayer.js";
import type { StartedGame } from "../types/Game.js";

export function dealCardsToPlayers(game: StartedGame): StartedGame {
  Array.from({ length: INITIAL_HAND_SIZE }).forEach(() => {
    game.players.forEach((p) => {
      game = dealCardToPlayer(game, p);
    });
  });

  return game;
}
