import type { Card, DiscardedCard } from "./Card.js";
import type { ChatMessage } from "./ChatMessage.js";

export type ClientState = {
  readonly status: "created" | "started" | "completed" | "forfeited";
  readonly gameId: string;
  readonly playerId: string;
  readonly player: Player;
  readonly otherPlayers: readonly OtherPlayer[];
  readonly usernames: readonly string[];
  readonly adminUsername: string;
  readonly lastDiscard: DiscardedCard | null;
  readonly currentPlayerUsername: string;
  readonly isReversed: boolean;
  readonly expiresAt: number;
  readonly chatMessages: readonly ChatMessage[];
};

type Player = {
  readonly username: string;
  readonly hand: readonly Card[];
  readonly score: number;
};

type OtherPlayer = {
  readonly username: string;
  readonly numCards: number;
  readonly score: number;
};
