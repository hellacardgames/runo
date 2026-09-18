import {
  getClientStateAndClearEventsFactory,
  getCurrentPlayer,
  getPlayer,
} from "@hellacardgames/lib";
import type { ClientState } from "../types/ClientState.js";
import type { Game } from "../types/Game.js";

export const getClientStateAndClearEvents = getClientStateAndClearEventsFactory<
  Game,
  ClientState
>((game, player) => ({
  status: game.status,
  gameId: game.id,
  playerId: player.id,
  player: {
    username: player.username,
    hand: player.hand,
    score: player.score,
  },
  otherPlayers: game.players
    .filter((p) => p.id !== player.id)
    .map((p) => ({
      username: p.username,
      numCards: p.hand.length,
      score: p.score,
    })),
  usernames: game.players.map((p) => p.username),
  adminUsername: getPlayer(game, game.adminId).player.username,
  lastDiscard: game.discardPile[game.discardPile.length - 1] ?? null,
  currentPlayerUsername: getCurrentPlayer(game).username,
  isReversed: game.isReversed,
  expiresAt: game.expiresAt,
  chatMessages: game.chatMessages,
}));
