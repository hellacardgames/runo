import { createManagerFactory } from "@hellacardgames/lib";
import {
  createGame,
  drawCard,
  getClientStateAndClearEvents,
  getEventsAndClearAcknowledged,
  joinGame,
  leaveGame,
  MAX_PLAYERS,
  playCard,
  playWildCard,
  sendChat,
  startGame,
} from "../game/index.js";

export const createManager = createManagerFactory({
  maxPlayers: MAX_PLAYERS,
  createGame,
  getClientStateAndClearEvents,
  getEventsAndClearAcknowledged,
  joinGame,
  leaveGame,
  sendChat,
  startGame,
  addCustomActions: (wrapAction) => ({
    drawCard: wrapAction(drawCard),
    playCard: wrapAction(playCard),
    playWildCard: wrapAction(playWildCard),
  }),
});
