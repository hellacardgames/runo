import type { Player } from "./Player.js";

export type Game = {
  readonly id: string;
  status: "open" | "active" | "completed" | "forfeited";
  players: Player[];
  currentPlayerIndex: number;
};
