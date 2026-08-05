import type { Game } from "../types/Game.js";
import { requirePlayer } from "./requirePlayer.js";

export function discardLeavingPlayerCards(game: Game, playerId: string): Game {
  const { player } = requirePlayer(game, playerId);

  return {
    ...game,
    discardPile: [
      ...player.hand.map((c) => {
        if (c.type === "wild") {
          return { type: "discardedWild", card: c, color: "blue" } as const;
        }
        return c;
      }),
      ...game.discardPile,
    ],
  };
}
