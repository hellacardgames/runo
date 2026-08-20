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
import type { ClientState, Color, Game, GameEvent } from "../game/index.js";

export type CreateGameResult =
  | {
      readonly success: true;
      readonly gameId: string;
      readonly playerId: string;
    }
  | {
      readonly success: false;
      readonly error: "maxGamesReached";
    };

export type DrawCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "outOfTurn"
        | "hasPlayableCard";
    };

export type GetClientStateAndClearEventsResult =
  | {
      readonly success: true;
      readonly state: ClientState;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export type GetEventsAndClearAcknowledgedResult =
  | {
      readonly success: true;
      readonly events: readonly GameEvent[];
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export type GetJoinableGamesResult = {
  readonly games: readonly {
    readonly id: string;
    readonly numPlayers: number;
  }[];
};

export type JoinGameResult =
  | {
      readonly success: true;
      readonly playerId: string;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "maxPlayersReached"
        | "alreadyInGame";
    };

export type LeaveGameResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export type PlayCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "outOfTurn"
        | "cardNotFound"
        | "cardIsWild"
        | "cardNotPlayable";
    };

export type PlayWildCardResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "outOfTurn"
        | "cardNotFound"
        | "cardNotWild"
        | "cardNotPlayable";
    };

export type SendChatResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

export type StartGameResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error:
        | "gameNotFound"
        | "invalidStatus"
        | "playerNotFound"
        | "playerNotAdmin"
        | "minPlayersNotReached";
    };

export class Manager extends ManagerBase<Game> {
  createGame(userId: string, username: string): CreateGameResult {
    if (this.games.size === this.maxGames) {
      return { success: false, error: "maxGamesReached" };
    }
    const result = createGame(userId, username);
    this.games.set(result.game.id, result.game);
    return { success: true, gameId: result.game.id, playerId: result.playerId };
  }

  drawCard(gameId: string, playerId: string): DrawCardResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    if (game.status !== "started") {
      return { success: false, error: "invalidStatus" };
    }
    const result = drawCard(game, playerId);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true };
  }

  getClientStateAndClearEvents(
    gameId: string,
    playerId: string,
  ): GetClientStateAndClearEventsResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    const result = getClientStateAndClearEvents(game, playerId);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true, state: result.state };
  }

  getEventsAndClearAcknowledged(
    gameId: string,
    playerId: string,
    lastReadId: string | null,
  ): GetEventsAndClearAcknowledgedResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    const result = getEventsAndClearAcknowledged(game, playerId, lastReadId);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true, events: result.events };
  }

  getJoinableGames(): GetJoinableGamesResult {
    return {
      games: Array.from(this.games.values())
        .filter((g) => g.status === "created" && g.players.length < MAX_PLAYERS)
        .map((g) => ({
          id: g.id,
          numPlayers: g.players.length,
        })),
    };
  }

  joinGame(gameId: string, userId: string, username: string): JoinGameResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    if (game.status !== "created") {
      return { success: false, error: "invalidStatus" };
    }
    const result = joinGame(game, userId, username);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true, playerId: result.playerId };
  }

  leaveGame(gameId: string, playerId: string): LeaveGameResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    const result = leaveGame(game, playerId);
    if (!result.success) {
      return result;
    }
    if (result.game.players.length > 0) {
      this.games.set(gameId, result.game);
    } else {
      this.games.delete(gameId);
    }
    return { success: true };
  }

  playCard(gameId: string, playerId: string, cardId: string): PlayCardResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    if (game.status !== "started") {
      return { success: false, error: "invalidStatus" };
    }
    const result = playCard(game, playerId, cardId);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true };
  }

  playWildCard(
    gameId: string,
    playerId: string,
    cardId: string,
    color: Color,
  ): PlayWildCardResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    if (game.status !== "started") {
      return { success: false, error: "invalidStatus" };
    }
    const result = playWildCard(game, playerId, cardId, color);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true };
  }

  sendChat(gameId: string, playerId: string, text: string): SendChatResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    const result = sendChat(game, playerId, text);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true };
  }

  startGame(gameId: string, playerId: string): StartGameResult {
    const game = this.games.get(gameId);
    if (!game) {
      return { success: false, error: "gameNotFound" };
    }
    if (game.status !== "created") {
      return { success: false, error: "invalidStatus" };
    }
    const result = startGame(game, playerId);
    if (!result.success) {
      return result;
    }
    this.games.set(gameId, result.game);
    return { success: true };
  }
}
