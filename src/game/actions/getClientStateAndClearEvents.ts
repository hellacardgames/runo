import {
  getClientStateAndClearEventsFactory,
  getCurrentPlayer,
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
}));
