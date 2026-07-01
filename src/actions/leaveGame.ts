import type {
  AbandonedGame,
  ForfeitedGame,
  OpenGame,
  Game,
  ActiveGame,
  CompletedGame,
} from "../types/game.js";

type LeaveGameResult =
  | {
      readonly success: true;
      readonly game:
        OpenGame | ActiveGame | CompletedGame | ForfeitedGame | AbandonedGame;
    }
  | {
      readonly success: false;
      readonly error: "invalidStatus";
    };

export function leaveGame(game: Game): LeaveGameResult {
  if (game.status === "abandoned") {
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
