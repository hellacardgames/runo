import { randomUUID } from "node:crypto";
import type { OpenGame } from "../types/game.js";

type CreateGameResult = {
  readonly success: true;
  readonly game: OpenGame;
};

export function createGame(name: string): CreateGameResult {
  const player: OpenGame["players"][number] = {
    id: randomUUID(),
    pid: randomUUID(),
    name,
  };
  return {
    success: true,
    game: {
      id: randomUUID(),
      status: "open",
      players: [player],
    },
  };
}
