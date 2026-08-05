type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function requirePlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
): Player<TGame> {
  const player = game.players.find((p) => p.id === playerId);

  if (!player) {
    throw new Error(`Player ${playerId} does not exist in game.`);
  }

  return player;
}
