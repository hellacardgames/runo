import { emitEvent } from "./emitEvent.js";
import { emitEventToPlayer } from "./emitEventToPlayer.js";
import type { Game } from "../types/Game.js";
import type { Player } from "../types/Player.js";

export function dealCardToPlayer(game: Game, player: Player): Game {
  const card = game.drawPile[game.drawPile.length - 1];
  if (!card) {
    throw new Error("Ran out of cards while dealing to players.");
  }

  player = { ...player, hand: [...player.hand, card] };

  game = {
    ...game,
    drawPile: game.drawPile.slice(0, -1),
    players: game.players.map((p) => (p.id === player.id ? player : p)),
  };

  game = emitEventToPlayer(game, player, { type: "cardDealt", card });
  game = emitEvent(game, {
    type: "cardDealtToPlayer",
    username: player.username,
  });

  if (game.isReversed) {
    game = { ...game, isReversed: false };
    game = emitEvent(game, {
      type: "directionChanged",
      isReversed: game.isReversed,
    });
  }

  return game;
}
