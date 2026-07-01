import type { CompletedGame, Game, ActiveGame } from "../types/game.js";

type PlayCardResult =
  | {
      readonly success: true;
      readonly game: ActiveGame | CompletedGame;
    }
  | {
      readonly success: false;
      readonly error: "invalidStatus";
    };

export function playCard(game: Game): PlayCardResult {
  if (game.status !== "active") {
    return {
      success: false,
      error: "invalidStatus",
    };
  }
  return {
    success: true,
    game: { ...game },
  };
}
