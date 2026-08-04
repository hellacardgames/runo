import type { Card, DiscardedCard } from "./Card.js";
import type { Player } from "./Player.js";

export type Game = {
  readonly id: string;
  readonly createdAt: number;
  readonly expiresAt: number;
  readonly status: "created" | "started" | "forfeited" | "completed";
  readonly players: readonly Player[];
  readonly drawPile: readonly Card[];
  readonly discardPile: readonly DiscardedCard[];
  readonly currentPlayerIndex: number;
  readonly isReversed: boolean;
};
