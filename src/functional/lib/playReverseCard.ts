import { getCurrentPlayer } from "./getCurrentPlayer.js";
import type { ReverseCard } from "../types/Card.js";
import type { CompletedGame, StartedGame } from "../types/Game.js";

export function playReverseCard(
  game: StartedGame,
  card: ReverseCard,
): StartedGame | CompletedGame {
  const player = getCurrentPlayer(game);

  console.log(card, player);

  return game;
}
