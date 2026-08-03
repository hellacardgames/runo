import { CARDS, INITIAL_HAND_SIZE, MIN_PLAYERS } from "../constants.js";
import { games } from "../games.js";
import { shuffle } from "../utils/shuffle.js";

type StartGameResult =
  { success: true } | { success: false; error: StartGameError };

type StartGameError =
  | "gameNotFound"
  | "playerNotFound"
  | "notAdmin"
  | "invalidStatus"
  | "minPlayersNotReached";

export function startGame(gameId: string, playerId: string): StartGameResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }
  const player = game.playerList.findById(playerId);
  if (!player) {
    return { success: false, error: "playerNotFound" };
  }
  if (player !== game.playerList.getAt(0)) {
    return { success: false, error: "notAdmin" };
  }
  if (game.status !== "open") {
    return { success: false, error: "invalidStatus" };
  }
  if (game.playerList.length < MIN_PLAYERS) {
    return { success: false, error: "minPlayersNotReached" };
  }

  // Initialize and shuffle the draw pile.
  game.drawPile = [...CARDS];
  shuffle(game.drawPile);

  // Deal cards to players.
  for (let i = 0; i < INITIAL_HAND_SIZE; i++) {
    for (const p of game.playerList) {
      const card = game.drawPile.pop();
      if (!card) {
        throw new Error("Ran out of cards while dealing.");
      }
      p.hand.push(card);
    }
  }

  // Start the discard pile (skip action cards / wilds).
  do {
    const card = game.drawPile.pop();
    if (!card) {
      throw new Error("Ran out of cards during first discard.");
    }
    if (card.type === "number") {
      game.discardPile.push(card);
    } else {
      game.drawPile.unshift(card);
    }
  } while (game.discardPile.length === 0);

  game.status = "active";
  return { success: true };
}
