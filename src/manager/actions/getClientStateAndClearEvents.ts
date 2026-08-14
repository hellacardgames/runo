import { getClientStateAndClearEvents as doGetClientStateAndClearEvents } from "../../game/actions/getClientStateAndClearEvents.js";
import { games } from "../games.js";
import type { ClientState } from "../../game/types/ClientState.js";

type GetClientStateAndClearEventsResult =
  | {
      readonly success: true;
      readonly state: ClientState;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export function getClientStateAndClearEvents(
  gameId: string,
  playerId: string,
): GetClientStateAndClearEventsResult {
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
