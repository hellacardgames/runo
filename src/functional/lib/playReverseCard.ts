import { requirePlayer } from "./requirePlayer.js";
import type { ReverseCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function playReverseCard(
  game: StartedGame,
  playerId: string,
  card: ReverseCard,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  console.log(card, player);

  return game;
}
