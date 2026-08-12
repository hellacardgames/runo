type Game = {
  readonly players: readonly unknown[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export function calculateNextPlayerIndex<TGame extends Game>(
  game: TGame,
): number {
  let nextPlayerIndex: number;

  if (game.isReversed) {
    nextPlayerIndex =
      (game.currentPlayerIndex + game.players.length - 1) % game.players.length;
  } else {
    nextPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
  }

  return nextPlayerIndex;
}
