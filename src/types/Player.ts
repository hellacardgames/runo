import type { Card } from "./Card.js";

export type Player = {
  readonly id: string;
  readonly pid: string;
  readonly name: string;
  hand: Card[];
  roundsWon: number;
  points: number;
};
