type RequirePlayerResult<TGame extends Game> = {
  readonly player: Player<TGame>;
  readonly index: number;
};

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function requirePlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): RequirePlayerResult<TGame> {
  // const { player, index } = findPlayer(game, playerId);
  const index = game.players.findIndex((p) => p.id === playerId);

  if (index === -1) {
    throw new Error(`Player ${playerId} does not exist in game.`);
  }

  return {
    player: game.players[index]!,
    index,
  };
}
