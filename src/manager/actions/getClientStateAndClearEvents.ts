import { getClientStateAndClearEvents as doGetClientStateAndClearEvents } from "../../actions/getClientStateAndClearEvents.js";
import { games } from "../games.js";

export function getClientStateAndClearEvents(gameId: string, playerId: string) {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }

  const result = doGetClientStateAndClearEvents(game, playerId);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return {
    success: true,
    state: result.state,
  };
}
