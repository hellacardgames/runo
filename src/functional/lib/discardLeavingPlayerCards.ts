import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

export function discardLeavingPlayerCards(game: Game, player: Player): Game {
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
