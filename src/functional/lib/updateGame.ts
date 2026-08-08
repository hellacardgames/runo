import type { Game, UpdatableGameProperties } from "../types/Game.js";

type GameUpdates = Partial<UpdatableGameProperties>;

export function updateGame<TGame extends Game>(
  game: TGame,
  updates: GameUpdates,
): TGame {
  return {
    ...game,
    ...updates,
  };
}
