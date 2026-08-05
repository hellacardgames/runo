import { requirePlayer } from "./requirePlayer.js";

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly events: readonly {
      readonly id: string;
    }[];
  }[];
};

type Event<TGame extends Game> = TGame["players"][number]["events"][number];

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEventToPlayer<TGame extends Game>(
  game: TGame,
  playerId: string,
  data: OmitId<Event<TGame>>,
): TGame {
  const { player } = requirePlayer(game, playerId);

  return {
    ...game,
    players: game.players.map((p) => {
      if (p.id !== player.id) {
        return p;
      }
      return {
        ...p,
        events: [...p.events, { ...data, id: crypto.randomUUID() }],
      };
    }),
  };
}
