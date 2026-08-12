import { getCurrentPlayer } from "./getCurrentPlayer.js";
import type { SkipCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playSkipCard(
  game: StartedGame,
  card: SkipCard,
): StartedGame | CompletedGame {
  const player = getCurrentPlayer(game);

  console.log(card, player);

  return game;
}
