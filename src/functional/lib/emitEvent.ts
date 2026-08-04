type Game = {
  readonly players: readonly {
    readonly events: readonly { readonly id: string }[];
  }[];
};

type OmitId<T> = T extends unknown ? Omit<T, "id"> : never;

export function emitEvent<T extends Game>(
  game: T,
  data: OmitId<T["players"][number]["events"][number]>,
): T {
  const event = { ...data, id: crypto.randomUUID() };
  return {
    ...game,
    players: game.players.map((p) => ({
      ...p,
      events: [...p.events, event],
    })),
  };
}
