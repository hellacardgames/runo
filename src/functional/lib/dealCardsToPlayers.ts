import { dealCardToPlayer } from "./dealCardToPlayer.js";
import type { StartedGame } from "../types/Game.js";

export function dealCardsToPlayers(
  game: StartedGame,
  cardsPerPlayer: number,
): StartedGame {
  Array.from({ length: cardsPerPlayer }).forEach(() => {
    game.players.forEach((p) => {
      game = dealCardToPlayer(game, p);
    });
  });

  return game;
}
