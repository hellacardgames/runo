import type { PlayerList } from "../utils/PlayerList.js";
import type { Card, DiscardedCard } from "./Card.js";
import type { Player } from "./Player.js";

export type Game = {
  readonly id: string;
  status: "open" | "active" | "completed" | "forfeited";
  readonly playerList: PlayerList<Player>;
  drawPile: Card[];
  discardPile: DiscardedCard[];
  currentPlayerIndex: number;
};
