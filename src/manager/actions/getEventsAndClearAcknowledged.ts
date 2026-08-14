import { getEventsAndClearAcknowledged as doGetEventsAndClearAcknowledged } from "../../game/actions/getEventsAndClearAcknowledged.js";
import { games } from "../games.js";
import type { GameEvent } from "../../game/types/GameEvent.js";

type GetEventsAndClearAcknowledgedResult =
  | {
      readonly success: true;
      readonly events: readonly GameEvent[];
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export function getEventsAndClearAcknowledged(
  gameId: string,
  playerId: string,
  lastReadId: string | null,
): GetEventsAndClearAcknowledgedResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }

  const result = doGetEventsAndClearAcknowledged(game, playerId, lastReadId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return {
    success: true,
    events: result.events,
  };
}
