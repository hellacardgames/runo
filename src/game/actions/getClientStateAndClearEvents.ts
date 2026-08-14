import { getCurrentPlayer, updatePlayer } from "@hellacardgames/lib";
import type { ClientState } from "../types/ClientState.js";
import type { Game } from "../types/Game.js";

type GetClientStateAndClearEventsResult =
  | {
      readonly success: true;
      readonly state: ClientState;
      readonly game: Game;
    }
  | {
      readonly success: false;
      readonly error: "playerNotFound";
    };

export function getClientStateAndClearEvents(
  game: Game,
  playerId: string,
): GetClientStateAndClearEventsResult {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }

  const state: ClientState = {
    status: game.status,
    gameId: game.id,
    playerId,
    username: player.username,
    players: game.players.map((p) => ({
      username: p.username,
      numCards: p.hand.length,
      score: p.score,
    })),
    hand: player.hand,
    lastDiscard: game.discardPile[game.discardPile.length - 1] ?? null,
    currentPlayerUsername: getCurrentPlayer(game).username,
    isReversed: game.isReversed,
    expiresAt: game.expiresAt,
    chatMessages: game.chatMessages,
  };

  game = updatePlayer(game, player.id, (p) => ({ ...p, events: [] }));

  return { success: true, state, game };
}
