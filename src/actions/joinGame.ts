import type { OpenGame, Game } from "../types/game.js";

type JoinGameResult =
  | {
      readonly success: true;
      readonly game: OpenGame;
    }
  | {
      readonly success: false;
      readonly error: "invalidStatus";
    };

export function joinGame(game: Game): JoinGameResult {
  if (game.status !== "open") {
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
