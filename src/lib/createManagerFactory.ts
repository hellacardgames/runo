type Params<
  TGame extends Game,
  TClientState extends object,
  TGameEvent extends object,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  TCustomActions extends CustomActions,
> = {
  readonly maxPlayers: number;
  readonly createGame: (
    userId: string,
    username: string,
  ) => { game: TGame; playerId: string };

  readonly getClientStateAndClearEvents: (
    game: TGame,
    playerId: string,
  ) =>
    | { success: true; game: TGame; state: TClientState }
    | { success: false; error: TGetClientStateAndClearEventsError };

  readonly getEventsAndClearAcknowledged: (
    game: TGame,
    playerId: string,
    lastReadId: string | null,
  ) =>
    | { success: true; game: TGame; events: readonly TGameEvent[] }
    | { success: false; error: TGetEventsAndClearAcknowledgedError };

  readonly joinGame: (
    game: CreatedGame<TGame>,
    userId: string,
    username: string,
  ) =>
    | { success: true; game: CreatedGame<TGame>; playerId: string }
    | { success: false; error: TJoinGameError };

  readonly leaveGame: (
    game: TGame,
    playerId: string,
  ) =>
    { success: true; game: TGame } | { success: false; error: TLeaveGameError };

  readonly sendChat: (
    game: TGame,
    playerId: string,
    text: string,
  ) =>
    { success: true; game: TGame } | { success: false; error: TSendChatError };

  readonly startGame: (
    game: CreatedGame<TGame>,
    playerId: string,
  ) =>
    | { success: true; game: StartedGame<TGame> }
    | { success: false; error: TStartGameError };

  readonly createCustomActions: (games: Map<string, TGame>) => TCustomActions;
};

type CreatedGame<TGame extends Game> = Extract<TGame, { status: "created" }>;
type StartedGame<TGame extends Game> = Extract<TGame, { status: "started" }>;

type Game =
  | {
      status: "created";
      id: string;
      expiresAt: number;
      players: readonly object[];
    }
  | {
      status: "started";
      id: string;
      expiresAt: number;
      players: readonly object[];
    }
  | {
      status: "forfeited";
      id: string;
      expiresAt: number;
      players: readonly object[];
    }
  | {
      status: "completed";
      id: string;
      expiresAt: number;
      players: readonly object[];
    };

type CustomActions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [P in string]: (...args: any[]) => object;
};

export function createManagerFactory<
  TGame extends Game,
  TClientState extends object,
  TGameEvent extends object,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  TCustomActions extends CustomActions,
>(
  params: Params<
    TGame,
    TClientState,
    TGameEvent,
    TGetClientStateAndClearEventsError,
    TGetEventsAndClearAcknowledgedError,
    TJoinGameError,
    TLeaveGameError,
    TSendChatError,
    TStartGameError,
    TCustomActions
  >,
) {
  return (logKey: string, maxGames: number, watchdogIntervalMs: number) => {
    const games = new Map<string, TGame>();

    const watchdog = new Watchdog(logKey, watchdogIntervalMs, games);
    watchdog.start();

    function createGame(userId: string, username: string) {
      if (games.size === maxGames) {
        return { success: false, error: "maxGamesReached" } as const;
      }
      const result = params.createGame(userId, username);
      games.set(result.game.id, result.game);
      return {
        success: true,
        gameId: result.game.id,
        playerId: result.playerId,
      } as const;
    }

    function getClientStateAndClearEvents(gameId: string, playerId: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.getClientStateAndClearEvents(game, playerId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true, state: result.state } as const;
    }

    function getEventsAndClearAcknowledged(
      gameId: string,
      playerId: string,
      lastReadId: string | null,
    ) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.getEventsAndClearAcknowledged(
        game,
        playerId,
        lastReadId,
      );
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true, events: result.events } as const;
    }

    function getJoinableGames() {
      return {
        games: [
          ...Array.from(games.values())
            .filter(
              (g) =>
                g.status === "created" && g.players.length < params.maxPlayers,
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

    function joinGame(gameId: string, userId: string, username: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      if (!isCreatedGame(game)) {
        return { success: false, error: "invalidStatus" } as const;
      }
      const result = params.joinGame(game, userId, username);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true, playerId: result.playerId } as const;
    }

    function leaveGame(gameId: string, playerId: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.leaveGame(game, playerId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      if (result.game.players.length > 0) {
        games.set(gameId, result.game);
      } else {
        games.delete(gameId);
      }
      return { success: true } as const;
    }

    function sendChat(gameId: string, playerId: string, text: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      const result = params.sendChat(game, playerId, text);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true } as const;
    }

    function startGame(gameId: string, playerId: string) {
      const game = games.get(gameId);
      if (!game) {
        return { success: false, error: "gameNotFound" } as const;
      }
      if (!isCreatedGame(game)) {
        return { success: false, error: "invalidStatus" } as const;
      }
      const result = params.startGame(game, playerId);
      if (!result.success) {
        return { success: false as const, error: result.error } as const;
      }
      games.set(gameId, result.game);
      return { success: true } as const;
    }

    return {
      createGame,
      getClientStateAndClearEvents,
      getEventsAndClearAcknowledged,
      getJoinableGames,
      joinGame,
      leaveGame,
      sendChat,
      startGame,
      ...params.createCustomActions(games),
    } as const;
  };
}

function isCreatedGame<TGame extends Game>(
  game: TGame,
): game is Extract<TGame, { status: "created" }> {
  return game.status === "created";
}

class Watchdog<TGame extends Game> {
  private readonly logKey: string;
  private readonly intervalMs: number;
  private readonly games: Map<string, TGame>;

  constructor(logKey: string, intervalMs: number, games: Map<string, TGame>) {
    this.logKey = logKey;
    this.intervalMs = intervalMs;
    this.games = games;
  }

  start() {
    console.log(`watchdog start at ${Date.now()} (${this.logKey})`);
    setInterval(() => this.wakeUp(), this.intervalMs);
  }

  private wakeUp() {
    const now = Date.now();
    // console.log(`watchdog wakeUp at ${now} (${this.gameKey})`);
    for (const game of this.games.values()) {
      if (game.expiresAt <= now) {
        this.games.delete(game.id);
        console.log(`watchdog purged ${game.id} (${this.logKey})`);
      }
    }
  }
}
