import { INITIAL_HAND_SIZE } from "../constants.js";
import { dealCardToPlayer } from "./dealCardToPlayer.js";
import type { Game } from "../types/Game.js";

export function dealCardsToPlayers(game: Game): Game {
  Array.from({ length: INITIAL_HAND_SIZE }).forEach(() => {
    game.players.forEach((p) => {
      game = dealCardToPlayer(game, p);
    });
  });

  return game;
}
