import { getCurrentPlayer } from "./getCurrentPlayer.js";
import type { DrawTwoCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playDrawTwoCard(
  game: StartedGame,
  card: DrawTwoCard,
): StartedGame | CompletedGame {
  const player = getCurrentPlayer(game);

  console.log(card, player);

  return game;
}
