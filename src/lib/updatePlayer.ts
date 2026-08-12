import { requirePlayer } from "./requirePlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
  }[];
};

export function updatePlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
  update: (player: TGame["players"][number]) => TGame["players"][number],
): TGame {
  const { index } = requirePlayer(game, playerId);

  return {
    ...game,
    players: game.players.map((player, i) =>
      i === index ? update(player) : player,
    ),
  };
}
