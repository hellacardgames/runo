import { playCard as doPlayCard } from "../../game/index.js";
import { games } from "../games.js";

type PlayCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "outOfTurn"
        | "cardNotFound"
        | "cardIsWild"
        | "cardNotPlayable";
    };

export function playCard(
  gameId: string,
  playerId: string,
  cardId: string,
): PlayCardResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  if (game.status !== "started") {
    return { success: false, error: "invalidStatus" };
  }

  const result = doPlayCard(game, playerId, cardId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
