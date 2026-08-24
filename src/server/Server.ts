import { z } from "zod";
import { createManager } from "../manager/index.js";
import { COLORS } from "../game/index.js";

const drawCardInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
  })
  .transform(({ gameId, playerId }) => [gameId, playerId] as const);

const getClientStateAndClearEventsInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
  })
  .transform(({ gameId, playerId }) => [gameId, playerId] as const);

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

const joinGameInputSchema = z
  .object({
    gameId: z.string(),
  })
  .transform(({ gameId }) => [gameId] as const);

const leaveGameInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
  })
  .transform(({ gameId, playerId }) => [gameId, playerId] as const);

const playCardInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
    cardId: z.string(),
  })
  .transform(
    ({ gameId, playerId, cardId }) => [gameId, playerId, cardId] as const,
  );

const playWildCardInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
    cardId: z.string(),
    color: z.enum(COLORS),
  })
  .transform(
    ({ gameId, playerId, cardId, color }) =>
      [gameId, playerId, cardId, color] as const,
  );

const sendChatInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
    text: z.string(),
  })
  .transform(({ gameId, playerId, text }) => [gameId, playerId, text] as const);

const startGameInputSchema = z
  .object({
    gameId: z.string(),
    playerId: z.string(),
  })
  .transform(({ gameId, playerId }) => [gameId, playerId] as const);

export class Server {
  private readonly manager: ReturnType<typeof createManager>;

  readonly actions = [
    { path: "/createGame", action: this.createGame.bind(this) },
    { path: "/drawCard", action: this.drawCard.bind(this) },
    {
      path: "/getClientStateAndClearEvents",
      action: this.getClientStateAndClearEvents.bind(this),
    },
    {
      path: "/getEventsAndClearAcknowledged",
      action: this.getEventsAndClearAcknowledged.bind(this),
    },
    { path: "/getJoinableGames", action: this.getJoinableGames.bind(this) },
    { path: "/joinGame", action: this.joinGame.bind(this) },
    { path: "/leaveGame", action: this.leaveGame.bind(this) },
    { path: "/playCard", action: this.playCard.bind(this) },
    { path: "/playWildCard", action: this.playWildCard.bind(this) },
    { path: "/sendChat", action: this.sendChat.bind(this) },
    { path: "/startGame", action: this.startGame.bind(this) },
  ] as const;

  constructor(...args: Parameters<typeof createManager>) {
    this.manager = createManager(...args);
  }

  private createGame(userId: string, username: string) {
    const result = this.manager.createGame(userId, username);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private drawCard(input: unknown) {
    const parseResult = drawCardInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.drawCard(...parseResult.data);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private getClientStateAndClearEvents(input: unknown) {
    const parseResult =
      getClientStateAndClearEventsInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.getClientStateAndClearEvents(
      ...parseResult.data,
    );
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private getEventsAndClearAcknowledged(input: unknown) {
    const parseResult =
      getEventsAndClearAcknowledgedInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.getEventsAndClearAcknowledged(
      ...parseResult.data,
    );
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private getJoinableGames() {
    return this.manager.getJoinableGames();
  }

  private joinGame(input: unknown, userId: string, username: string) {
    const parseResult = joinGameInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.joinGame(...parseResult.data, userId, username);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private leaveGame(input: unknown) {
    const parseResult = leaveGameInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.leaveGame(...parseResult.data);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private playCard(input: unknown) {
    const parseResult = playCardInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.playCard(...parseResult.data);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private playWildCard(input: unknown) {
    const parseResult = playWildCardInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.playWildCard(...parseResult.data);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private sendChat(input: unknown) {
    const parseResult = sendChatInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.sendChat(...parseResult.data);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  private startGame(input: unknown) {
    const parseResult = startGameInputSchema.safeParse(input);
    if (!parseResult.success) {
      return { success: false, error: "invalidInput" } as const;
    }
    const result = this.manager.startGame(...parseResult.data);
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }
}
