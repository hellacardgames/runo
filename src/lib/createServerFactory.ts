import { z } from "zod";

type Manager<
  TClientState extends object,
  TGameEvent extends object,
  TJoinableGame extends object,
  TCreateGameError extends string,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
> = {
  readonly createGame: (
    userId: string,
    username: string,
  ) =>
    | {
        readonly success: true;
        readonly gameId: string;
        readonly playerId: string;
      }
    | { readonly success: false; readonly error: TCreateGameError };

  readonly getClientStateAndClearEvents: (
    gameId: string,
    playerId: string,
  ) =>
    | { readonly success: true; readonly state: TClientState }
    | {
        readonly success: false;
        readonly error: TGetClientStateAndClearEventsError;
      };

  readonly getEventsAndClearAcknowledged: (
    gameId: string,
    playerId: string,
    lastReadId: string | null,
  ) =>
    | { readonly success: true; readonly events: readonly TGameEvent[] }
    | {
        readonly success: false;
        readonly error: TGetEventsAndClearAcknowledgedError;
      };

  readonly getJoinableGames: () => { readonly games: readonly TJoinableGame[] };

  readonly joinGame: (
    gameId: string,
    userId: string,
    username: string,
  ) =>
    | { readonly success: true; readonly playerId: string }
    | { readonly success: false; readonly error: TJoinGameError };

  readonly leaveGame: (
    gameId: string,
    playerId: string,
  ) =>
    | { readonly success: true }
    | { readonly success: false; readonly error: TLeaveGameError };

  readonly sendChat: (
    gameId: string,
    playerId: string,
    text: string,
  ) =>
    | { readonly success: true }
    | { readonly success: false; readonly error: TSendChatError };

  readonly startGame: (
    gameId: string,
    playerId: string,
  ) =>
    | { readonly success: true }
    | { readonly success: false; readonly error: TStartGameError };
};

type CustomActions = {
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: (...args: any[]) => object;
}[];

export function createServerFactory<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TArgs extends any[],
  TClientState extends object,
  TGameEvent extends object,
  TJoinableGame extends object,
  TCreateGameError extends string,
  TGetClientStateAndClearEventsError extends string,
  TGetEventsAndClearAcknowledgedError extends string,
  TJoinGameError extends string,
  TLeaveGameError extends string,
  TSendChatError extends string,
  TStartGameError extends string,
  TManager extends object,
  const TCustomActions extends CustomActions,
>(
  createManager: (
    ...args: TArgs
  ) => Manager<
    TClientState,
    TGameEvent,
    TJoinableGame,
    TCreateGameError,
    TGetClientStateAndClearEventsError,
    TGetEventsAndClearAcknowledgedError,
    TJoinGameError,
    TLeaveGameError,
    TSendChatError,
    TStartGameError
  > &
    TManager,
  createCustomActions: (manager: TManager) => TCustomActions,
) {
  return (...args: TArgs) => {
    const manager = createManager(...args);

    function createGame(userId: string, username: string) {
      return manager.createGame(userId, username);
    }

    const getClientStateAndClearEventsInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
      })
      .transform(({ gameId, playerId }) => [gameId, playerId] as const);

    function getClientStateAndClearEvents(input: unknown) {
      const parseResult =
        getClientStateAndClearEventsInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.getClientStateAndClearEvents(...parseResult.data);
    }

    const getEventsAndClearAcknowledgedInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
        lastReadId: z.string().nullable(),
      })
      .transform(
        ({ gameId, playerId, lastReadId }) =>
          [gameId, playerId, lastReadId] as const,
      );

    function getEventsAndClearAcknowledged(input: unknown) {
      const parseResult =
        getEventsAndClearAcknowledgedInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.getEventsAndClearAcknowledged(...parseResult.data);
    }

    function getJoinableGames() {
      return manager.getJoinableGames();
    }

    const joinGameInputSchema = z
      .object({
        gameId: z.string(),
      })
      .transform(({ gameId }) => [gameId] as const);

    function joinGame(input: unknown, userId: string, username: string) {
      const parseResult = joinGameInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.joinGame(...parseResult.data, userId, username);
    }

    const leaveGameInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
      })
      .transform(({ gameId, playerId }) => [gameId, playerId] as const);

    function leaveGame(input: unknown) {
      const parseResult = leaveGameInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.leaveGame(...parseResult.data);
    }

    const sendChatInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
        text: z.string(),
      })
      .transform(
        ({ gameId, playerId, text }) => [gameId, playerId, text] as const,
      );

    function sendChat(input: unknown) {
      const parseResult = sendChatInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.sendChat(...parseResult.data);
    }

    const startGameInputSchema = z
      .object({
        gameId: z.string(),
        playerId: z.string(),
      })
      .transform(({ gameId, playerId }) => [gameId, playerId] as const);

    function startGame(input: unknown) {
      const parseResult = startGameInputSchema.safeParse(input);
      if (!parseResult.success) {
        return { success: false, error: "invalidInput" } as const;
      }
      return manager.startGame(...parseResult.data);
    }

    return {
      actions: [
        { path: "/createGame", action: createGame },
        {
          path: "/getClientStateAndClearEvents",
          action: getClientStateAndClearEvents,
        },
        {
          path: "/getEventsAndClearAcknowledged",
          action: getEventsAndClearAcknowledged,
        },
        { path: "/getJoinableGames", action: getJoinableGames },
        { path: "/joinGame", action: joinGame },
        { path: "/leaveGame", action: leaveGame },
        { path: "/sendChat", action: sendChat },
        { path: "/startGame", action: startGame },
        ...createCustomActions(manager),
      ],
    } as const;
  };
}
