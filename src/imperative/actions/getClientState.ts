import { games } from "../games.js";
import type { ClientState } from "../types/ClientState.js";

type GetClientStateResult =
  | {
      readonly success: true;
      readonly state: ClientState;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export function getClientState(
  gameId: string,
  playerId: string,
): GetClientStateResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  const state: ClientState = {
    status: game.status,
    gameId,
    playerId,
    username: player.username,
    players: game.players.map((p) => ({
      username: p.username,
      numCards: p.hand.length,
      score: p.score,
    })),
    hand: player.hand,
    lastDiscard: game.discardPile[game.discardPile.length - 1]!,
    currentPlayerUsername: game.players[game.currentPlayerIndex]!.username,
    isReversed: game.isReversed,
    expiresAt: game.expiresAt,
    chatMessages: game.chatMessages,
  };
  player.events.length = 0;
  return { success: true, state };
}
