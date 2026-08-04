type Game = {
  readonly players: readonly {
    readonly events: readonly { readonly id: string }[];
  }[];
};

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEventToPlayer<T extends Game>(
  game: T,
  player: T["players"][number],
  data: OmitId<T["players"][number]["events"][number]>,
): T {
  return {
    ...game,
    players: game.players.map((p) => {
      if (p !== player) {
        return p;
      }
      return {
        ...p,
        events: [...p.events, { ...data, id: crypto.randomUUID() }],
      };
    }),
  };
}
