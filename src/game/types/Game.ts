import type { Card, DiscardedCard } from "./Card.js";
import type { ChatMessage } from "./ChatMessage.js";
import type { Player } from "./Player.js";

export type Game = CreatedGame | StartedGame | ForfeitedGame | CompletedGame;

export type CreatedGame = GameProperties & { readonly status: "created" };
export type StartedGame = GameProperties & { readonly status: "started" };
export type ForfeitedGame = GameProperties & { readonly status: "forfeited" };
export type CompletedGame = GameProperties & { readonly status: "completed" };

type GameProperties = {
  readonly id: string;
  readonly createdAt: number;
  readonly expiresAt: number;
  readonly status: "created" | "started" | "forfeited" | "completed";
  readonly players: readonly Player[];
  readonly drawPile: readonly Card[];
  readonly discardPile: readonly DiscardedCard[];
  readonly currentPlayerIndex: number;
  readonly isReversed: boolean;
  readonly chatMessages: readonly ChatMessage[];
};
