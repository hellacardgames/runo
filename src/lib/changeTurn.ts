export function changeTurn<
  Game extends {
    currentPlayerIndex: number;
    isReversed?: boolean;
    players: unknown[];
  },
>(game: Game) {
  if (game.isReversed) {
    game.currentPlayerIndex =
      (game.currentPlayerIndex + game.players.length - 1) % game.players.length;
  } else {
    game.currentPlayerIndex =
      (game.currentPlayerIndex + 1) % game.players.length;
  }
}
