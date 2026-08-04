import type { Card, DiscardedCard } from "./Card.js";
// import type { ChatMessage } from "./ChatMessage.js";

export type ClientState = {
  readonly status: "created" | "started" | "completed" | "forfeited";
  readonly gameId: string;
  readonly playerId: string;
  readonly username: string;
  readonly players: readonly Player[];
  readonly hand: readonly Card[];
  readonly lastDiscard: DiscardedCard | null;
  readonly currentPlayerUsername: string;
  readonly isReversed: boolean;
  readonly expiresAt: number;
  // readonly chatMessages: readonly ChatMessage[];
};

type Player = {
  readonly username: string;
  readonly numCards: number;
  readonly score: number;
};
