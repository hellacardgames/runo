import type { Game, ActiveGame } from "../types/game.js";

type StartGameResult =
  | {
      readonly success: true;
      readonly game: ActiveGame;
    }
  | {
      readonly success: false;
      readonly error: "invalidStatus";
    };

export function startGame(game: Game): StartGameResult {
  if (game.status !== "open") {
    return {
      success: false,
      error: "invalidStatus",
    };
  }
  return {
    success: true,
    game: {
      ...game,
      status: "active",
      players: game.players.map((player) => ({
        ...player,
        roundsWon: 0,
        points: 0,
      })),
      currentPlayerIndex: 0,
    },
  };
}
