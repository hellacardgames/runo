import { sendChat as doSendChat } from "../../game/actions/sendChat.js";
import { games } from "../games.js";

type SendChatResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound";
    }
  | DoSendChatError;

type DoSendChatError = Extract<DoSendChatResult, { success: false }>;

type DoSendChatResult = ReturnType<typeof doSendChat>;

export function sendChat(
  gameId: string,
  playerId: string,
  text: string,
): SendChatResult {
  const game = games.get(gameId);
  if (!game) {
    return { success: false, error: "gameNotFound" };
  }

  const result = doSendChat(game, playerId, text);

  if (!result.success) {
    return result;
  }

  games.set(gameId, result.game);

  return { success: true };
}
