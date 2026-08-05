import type { Card } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";
import { requirePlayer } from "./requirePlayer.js";

export function addCardToPlayerHand(
  game: StartedGame,
  playerId: string,
  card: Card,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

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
