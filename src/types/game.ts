export type Game =
  OpenGame | ActiveGame | CompletedGame | ForfeitedGame | AbandonedGame;

export type OpenGame = {
  readonly id: string;
  readonly status: "open";
  readonly players: readonly {
    readonly id: string;
    readonly pid: string;
    readonly name: string;
  }[];
};

export type ActiveGame = {
  readonly id: string;
  readonly status: "active";
  readonly players: readonly {
    readonly id: string;
    readonly pid: string;
    readonly name: string;
    readonly roundsWon: number;
    readonly points: number;
  }[];
  readonly currentPlayerIndex: number;
};

export type CompletedGame = {
  readonly id: string;
  readonly status: "completed";
  readonly players: readonly {
    readonly id: string;
    readonly pid: string;
    readonly name: string;
    readonly roundsWon: number;
    readonly points: number;
  }[];
};

export type ForfeitedGame = {
  readonly id: string;
  readonly status: "forfeited";
  readonly players: readonly {
    readonly id: string;
    readonly pid: string;
    readonly name: string;
    readonly roundsWon: number;
    readonly points: number;
  }[];
};

export type AbandonedGame = {
  readonly status: "abandoned";
  readonly id: string;
};
