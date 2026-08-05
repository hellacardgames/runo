type Game = {
  readonly players: readonly unknown[];
  readonly currentPlayerIndex: number;
  readonly isReversed?: boolean;
};

export function changeTurn<TGame extends Game>(game: TGame): TGame {
  let currentPlayerIndex: number;

  if (game.isReversed) {
    currentPlayerIndex =
      (game.currentPlayerIndex + game.players.length - 1) % game.players.length;
  } else {
    currentPlayerIndex = (game.currentPlayerIndex + 1) % game.players.length;
  }

  return {
    ...game,
    currentPlayerIndex,
  };
}
