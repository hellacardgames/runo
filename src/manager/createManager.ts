import { createManagerFactory } from "@hellacardgames/lib";
import {
  createGame,
  drawCard,
  getClientStateAndClearEvents,
  getEventsAndClearAcknowledged,
  joinGame,
  leaveGame,
  MAX_PLAYERS,
  playCard,
  playWildCard,
  sendChat,
  startGame,
} from "../game/index.js";
import type { Color } from "../game/index.js";

export const createManager = createManagerFactory({
  maxPlayers: MAX_PLAYERS,
  createGame,
  getClientStateAndClearEvents,
  getEventsAndClearAcknowledged,
  joinGame,
  leaveGame,
  sendChat,
  startGame,
  createCustomActions: (games) => ({
    drawCard: (gameId: string, playerId: string) => {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = drawCard(game, playerId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true } as const;
    },
    playCard: (gameId: string, playerId: string, cardId: string) => {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = playCard(game, playerId, cardId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true } as const;
    },
    playWildCard: (
      gameId: string,
      playerId: string,
      cardId: string,
      color: Color,
    ) => {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = playWildCard(game, playerId, cardId, color);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true } as const;
    },
  }),
});
