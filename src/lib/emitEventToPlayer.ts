import { updatePlayer } from "./updatePlayer.js";

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
  return updatePlayer(game, playerId, (p) => ({
    ...p,
    events: [...p.events, { ...data, id: crypto.randomUUID() }],
  }));
}
