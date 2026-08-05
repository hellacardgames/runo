import { findPlayerBy } from "./findPlayerBy.js";

type FindPlayerResult<TGame extends Game> = {
  readonly player: Player<TGame> | undefined;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function findPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): FindPlayerResult<TGame> {
  return findPlayerBy(game, (p) => p.id === playerId);
}
