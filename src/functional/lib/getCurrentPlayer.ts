export function getCurrentPlayer<
  Game extends {
    readonly players: readonly unknown[];
    readonly currentPlayerIndex: number;
  },
>(game: Game): Game["players"][number] {
  const player = game.players[game.currentPlayerIndex];
  if (!player) {
    throw new Error(`Current player not found.`);
  }
  return player;
}
