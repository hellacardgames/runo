import { getCurrentPlayer, updatePlayer } from "@hellacardgames/lib";
import type { ClientState } from "../types/ClientState.js";
import type { Game } from "../types/Game.js";

export function getClientStateAndClearEvents(game: Game, playerId: string) {
  const player = game.players.find((p) => p.id === playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" } as const;
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

  return { success: true, state, game } as const;
}
