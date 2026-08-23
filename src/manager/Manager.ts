import { ManagerBase } from "@hellacardgames/lib";
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
import type { Color, Game } from "../game/index.js";

export class Manager extends ManagerBase<Game> {
  createGame(userId: string, username: string) {
    if (this.games.size === this.maxGames) {
      return { success: false, error: "maxGamesReached" } as const;
    }
    const result = createGame(userId, username);
    this.games.set(result.game.id, result.game);
    return {
      success: true,
      gameId: result.game.id,
      playerId: result.playerId,
    } as const;
  }

  drawCard(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    if (game.status !== "started") {
      return { success: false, error: "invalidStatus" } as const;
    }
    const result = drawCard(game, playerId);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true } as const;
  }

  getClientStateAndClearEvents(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    const result = getClientStateAndClearEvents(game, playerId);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true, state: result.state } as const;
  }

  getEventsAndClearAcknowledged(
    gameId: string,
    playerId: string,
    lastReadId: string | null,
  ) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    const result = getEventsAndClearAcknowledged(game, playerId, lastReadId);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true, events: result.events } as const;
  }

  getJoinableGames() {
    return {
      games: [
        ...Array.from(this.games.values())
          .filter(
            (g) => g.status === "created" && g.players.length < MAX_PLAYERS,
          )
          .map(
            (g) =>
              ({
                id: g.id,
                numPlayers: g.players.length,
              }) as const,
          ),
      ] as const,
    } as const;
  }

  joinGame(gameId: string, userId: string, username: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    if (game.status !== "created") {
      return { success: false, error: "invalidStatus" } as const;
    }
    const result = joinGame(game, userId, username);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true, playerId: result.playerId } as const;
  }

  leaveGame(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    const result = leaveGame(game, playerId);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    if (result.game.players.length > 0) {
      this.games.set(gameId, result.game);
    } else {
      this.games.delete(gameId);
    }
    return { success: true } as const;
  }

  playCard(gameId: string, playerId: string, cardId: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    if (game.status !== "started") {
      return { success: false, error: "invalidStatus" } as const;
    }
    const result = playCard(game, playerId, cardId);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true } as const;
  }

  playWildCard(gameId: string, playerId: string, cardId: string, color: Color) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    if (game.status !== "started") {
      return { success: false, error: "invalidStatus" } as const;
    }
    const result = playWildCard(game, playerId, cardId, color);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true } as const;
  }

  sendChat(gameId: string, playerId: string, text: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    const result = sendChat(game, playerId, text);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true } as const;
  }

  startGame(gameId: string, playerId: string) {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" } as const;
    }
    if (game.status !== "created") {
      return { success: false, error: "invalidStatus" } as const;
    }
    const result = startGame(game, playerId);
    if (!result.success) {
      return { success: false as const, error: result.error } as const;
    }
    this.games.set(gameId, result.game);
    return { success: true } as const;
  }
}
