type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly unknown[];
  readonly currentPlayerIndex: number;
};

export function getCurrentPlayer<TGame extends Game>(
  game: TGame,
): Player<TGame> {
  const currentPlayer = game.players[game.currentPlayerIndex];
  if (!currentPlayer) {
    throw new Error(`Current player not found.`);
  }
  return currentPlayer;
}
