import { requirePlayer } from "./requirePlayer.js";
import type { NumberCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function playNumberCard(
  game: StartedGame,
  playerId: string,
  card: NumberCard,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  console.log(card, player);

  return game;
}
