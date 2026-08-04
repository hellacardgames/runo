export function changeTurn<
  Game extends {
    readonly players: readonly unknown[];
    readonly currentPlayerIndex: number;
    readonly isReversed?: boolean;
  },
>(game: Game): Game {
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
