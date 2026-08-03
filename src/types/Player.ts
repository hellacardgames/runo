import type { Card } from "./Card.js";
import type { GameEvent } from "./GameEvent.js";

export type Player = {
  readonly id: string;
  readonly userId: string;
  readonly username: string;
  readonly events: GameEvent[];
  hand: Card[];
  score: number;
};
