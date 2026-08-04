import type { Card } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";
import type { Player } from "../types/Player.js";

export function addCardToPlayerHand(
  game: StartedGame,
  player: Player,
  card: Card,
): StartedGame {
  return {
    ...game,
    players: game.players.map((p) => {
      if (p.id !== player.id) {
        return p;
      }
      return { ...p, hand: [...p.hand, card] };
    }),
  };
}
