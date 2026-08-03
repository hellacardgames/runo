import type { PlayerList } from "../utils/PlayerList.js";
import type { Card, DiscardedCard } from "./Card.js";
import type { ChatMessage } from "./ChatMessage.js";
import type { Player } from "./Player.js";

// TODO: Split into separate types!
export type Game = {
  status: "open" | "started" | "completed" | "forfeited";
  readonly id: string;
  readonly createdAt: number;
  expiresAt: number;
  readonly chatMessages: ChatMessage[];
  readonly playerList: PlayerList<Player>;
  drawPile: Card[];
  discardPile: DiscardedCard[];
};
