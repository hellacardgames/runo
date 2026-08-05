type AcknowledgeAndGetEventsResult<TGame extends Game> = {
  readonly events: readonly Event<TGame>[];
  readonly game: TGame;
};

type Event<TGame extends Game> = Player<TGame>["events"][number];

type Player<TGame extends Game> = TGame["players"][number];

type Game = {
  readonly players: readonly {
    readonly id: string;
    readonly events: readonly { readonly id: string }[];
  }[];
};

export function acknowledgeAndGetEvents<TGame extends Game>(
  game: TGame,
  player: Player<TGame>,
  lastReadId: string | null,
): AcknowledgeAndGetEventsResult<TGame> {
  const lastReadEventIndex = player.events.findIndex(
    (e) => e.id === lastReadId,
  );

  // -1 => slice(0) => return all events
  const events = player.events.slice(lastReadEventIndex + 1);

  game = {
    ...game,
    players: game.players.map((p) => {
      if (p.id === player.id) {
        return { ...p, events };
      }
      return p;
    }),
  };

  return {
    events,
    game,
  };
}
