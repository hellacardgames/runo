import { drawCard as doDrawCard } from "../../actions/drawCard.js";
import { games } from "../games.js";

type DrawCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "invalidStatus";
    }
  | DoDrawCardError;

type DoDrawCardError = Extract<DoDrawCardResult, { success: false }>;

type DoDrawCardResult = ReturnType<typeof doDrawCard>;

export function drawCard(gameId: string, playerId: string): DrawCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doDrawCard(game, playerId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
