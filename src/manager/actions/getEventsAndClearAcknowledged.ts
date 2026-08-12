import { getEventsAndClearAcknowledged as doGetEventsAndClearAcknowledged } from "../../actions/getEventsAndClearAcknowledged.js";
import { games } from "../games.js";

export function getEventsAndClearAcknowledged(
  gameId: string,
  playerId: string,
  lastReadId: string | null,
) {
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
