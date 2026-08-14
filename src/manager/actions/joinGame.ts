import { joinGame as doJoinGame } from "../../game/actions/joinGame.js";
import { games } from "../games.js";

type JoinGameResult =
  | {
      readonly success: true;
      readonly playerId: string;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "invalidStatus";
    }
  | DoJoinGameError;

type DoJoinGameError = Extract<DoJoinGameResult, { success: false }>;

type DoJoinGameResult = ReturnType<typeof doJoinGame>;

export function joinGame(
  gameId: string,
  userId: string,
  username: string,
): JoinGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doJoinGame(game, userId, username);
  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return {
    success: true,
    playerId: result.playerId,
  };
}
