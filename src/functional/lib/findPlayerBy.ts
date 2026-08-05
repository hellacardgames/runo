type FindPlayerByResult<TGame extends Game> = {
  readonly player: Player<TGame> | undefined;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly unknown[];
};

export function findPlayerBy<TGame extends Game>(
  game: TGame,
  predicate: (player: Player<TGame>) => boolean,
): FindPlayerByResult<TGame> {
  const index = game.players.findIndex(predicate);

  if (index === -1) {
    return {
      player: undefined,
      index,
    };
  }

  return {
    player: game.players[index]!,
    index,
  };
}
