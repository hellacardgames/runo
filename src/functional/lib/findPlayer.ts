type FindPlayerResult<TGame extends Game> = Found<TGame> | NotFound;

type Found<TGame extends Game> = {
  readonly player: Player<TGame>;
  readonly index: number;
};

type NotFound = {
  readonly player: undefined;
  readonly index: -1;
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
  const index = game.players.findIndex((p) => p.id === playerId);

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
