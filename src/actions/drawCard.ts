import type { Game, ActiveGame } from "../types/game.js";

type DrawCardResult =
  | {
      readonly success: true;
      readonly game: ActiveGame;
    }
  | {
      readonly success: false;
      readonly error: "invalidStatus";
    };

export function drawCard(game: Game): DrawCardResult {
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
