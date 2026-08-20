export { Client } from "./Client.js";

export type {
  CreateGameResult,
  DrawCardResult,
  GetClientStateAndClearEventsResult,
  GetEventsAndClearAcknowledgedResult,
  GetJoinableGamesResult,
  JoinGameResult,
  LeaveGameResult,
  PlayCardResult,
  PlayWildCardResult,
  SendChatResult,
  StartGameResult,
} from "./Client.js";

export type {
  Card,
  ChatMessage,
  ClientState,
  Color,
  DiscardedCard,
  GameEvent,
} from "../game/index.js";
