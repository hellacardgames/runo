import { MAX_PLAYERS } from "../constants.js";
import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

type JoinGameResult =
  | {
      readonly success: true;
      readonly game: Game;
      readonly playerId: string;
    }
  | {
      readonly success: false;
      readonly error: "invalidStatus" | "maxPlayersReached" | "alreadyInGame";
    };

export function joinGame(
  game: Game,
  userId: string,
  username: string,
): JoinGameResult {
  if (game.status !== "created") {
    return { success: false, error: "invalidStatus" };
  }
  if (game.players.length === MAX_PLAYERS) {
    return { success: false, error: "maxPlayersReached" };
  }
  if (game.players.find((p) => p.userId === userId)) {
    return { success: false, error: "alreadyInGame" };
  }

  const player: Player = {
    id: crypto.randomUUID(),
    userId,
    username,
    events: [],
    hand: [],
    score: 0,
  };

  game = {
    ...game,
    players: [...game.players, player],
  };

  return { success: true, game, playerId: player.id };
}
