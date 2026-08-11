import { requirePlayer } from "./requirePlayer.js";
import type { SkipCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function playSkipCard(
  game: StartedGame,
  playerId: string,
  card: SkipCard,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  console.log(card, player);

  return game;
}
