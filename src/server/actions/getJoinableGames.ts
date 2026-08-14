import { getJoinableGames as doGetJoinableGames } from "../../manager/actions/getJoinableGames.js";

type GetJoinableGamesResult = {
  readonly games: readonly {
    readonly id: string;
    readonly numPlayers: number;
  }[];
};

export function getJoinableGames(): GetJoinableGamesResult {
  return doGetJoinableGames();
}
