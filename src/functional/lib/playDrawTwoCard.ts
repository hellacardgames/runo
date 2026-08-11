import { requirePlayer } from "./requirePlayer.js";
import type { DrawTwoCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function playDrawTwoCard(
  game: StartedGame,
  playerId: string,
  card: DrawTwoCard,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  console.log(card, player);

  return game;
}
