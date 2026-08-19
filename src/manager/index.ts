import { watchdog } from "./watchdog.js";

export { createGame } from "./actions/createGame.js";
export { drawCard } from "./actions/drawCard.js";
export { getClientStateAndClearEvents } from "./actions/getClientStateAndClearEvents.js";
export { getEventsAndClearAcknowledged } from "./actions/getEventsAndClearAcknowledged.js";
export { getJoinableGames } from "./actions/getJoinableGames.js";
export { joinGame } from "./actions/joinGame.js";
export { leaveGame } from "./actions/leaveGame.js";
export { playCard } from "./actions/playCard.js";
export { playWildCard } from "./actions/playWildCard.js";
export { sendChat } from "./actions/sendChat.js";
export { startGame } from "./actions/startGame.js";

export { COLORS } from "../game/index.js";

export type {
  Card,
  ChatMessage,
  ClientState,
  Color,
  DiscardedCard,
  Game,
  GameEvent,
} from "../game/index.js";

watchdog.start();
