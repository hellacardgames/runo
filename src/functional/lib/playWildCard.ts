import { requirePlayer } from "./requirePlayer.js";
import type { Color, WildCard } from "../types/Card.js";
import type { StartedGame } from "../types/Game.js";

export function playWildCard(
  game: StartedGame,
  playerId: string,
  card: WildCard,
  color: Color,
): StartedGame {
  const { player } = requirePlayer(game, playerId);

  console.log(card, player, color);

  return game;
}
