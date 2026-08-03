import { games } from "../games.js";
import type { GameEvent } from "../types/GameEvent.js";

type GetEventsResult =
  | {
      readonly success: true;
      readonly events: readonly GameEvent[];
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export function getEvents(
  gameId: string,
  playerId: string,
  lastReadId: string,
): GetEventsResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  const lastReadEventIndex = player.events.findIndex(
    (e) => e.id === lastReadId,
  );
  player.events.splice(0, lastReadEventIndex + 1);
  return { success: true, events: player.events };
}
