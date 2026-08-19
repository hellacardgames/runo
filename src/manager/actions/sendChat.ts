import { sendChat as doSendChat } from "../../game/index.js";
import { games } from "../games.js";

type SendChatResult =
  | {
      readonly success: true;
    }
  | {
      readonly success: false;
      readonly error: "gameNotFound" | "playerNotFound";
    };

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
