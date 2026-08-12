import { acknowledgeAndGetEvents as doAcknowledgeAndGetEvents } from "../lib/acknowledgeAndGetEvents.js";
import type { Game } from "../types/Game.js";
import type { GameEvent } from "../types/GameEvent.js";

type AcknowledgeAndGetEventsResult =
  | {
      readonly success: true;
      readonly events: readonly GameEvent[];
      readonly game: Game;
    }
  | {
      readonly success: false;
      readonly error: "playerNotFound";
    };

export function acknowledgeAndGetEvents(
  game: Game,
  playerId: string,
  lastReadId: string | null,
): AcknowledgeAndGetEventsResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }

  const result = doAcknowledgeAndGetEvents(game, player.id, lastReadId);

  return {
    success: true,
    events: result.events,
    game: result.game,
  };
}
