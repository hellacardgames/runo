type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function assertPlayerBelongsToGame<TGame extends Game>(
  game: TGame,
  player: Player<TGame>,
): void {
  const existingPlayer = game.players.find((p) => p.id === player.id);

  if (!existingPlayer) {
    throw new Error(`Player ${player.id} does not exist in game.`);
  }

  if (existingPlayer !== player) {
    throw new Error(
      `Player ${player.id} exists in game, but a different instance was provided.`,
    );
  }
}
