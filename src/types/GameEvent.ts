import type { Card, DiscardedCard } from "./Card.js";
import type { ChatMessage } from "./ChatMessage.js";

export type GameEvent =
  | {
      readonly type: "cardDealt";
      readonly id: string;
      readonly card: Card;
    }
  | {
      readonly type: "cardDealtToPlayer";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "cardDiscarded";
      readonly id: string;
      readonly card: DiscardedCard;
    }
  | {
      readonly type: "cardPlayed";
      readonly id: string;
      readonly username: string;
      readonly card: DiscardedCard;
    }
  | {
      readonly type: "chat";
      readonly id: string;
      readonly message: ChatMessage;
    }
  | {
      readonly type: "directionChanged";
      readonly id: string;
      readonly isReversed: boolean;
    }
  | {
      readonly type: "discardPileReturned";
      readonly id: string;
    }
  | {
      readonly type: "drewCard";
      readonly id: string;
      readonly card: Card;
    }
  | {
      readonly type: "expirationUpdated";
      readonly id: string;
      readonly expiresAt: number;
    }
  | {
      readonly type: "gameCompleted";
      readonly id: string;
    }
  | {
      readonly type: "gameForfeited";
      readonly id: string;
    }
  | {
      readonly type: "gameStarted";
      readonly id: string;
    }
  | {
      readonly type: "playerDrewCard";
      readonly id: string;
      readonly username: string;
      readonly isPlayable: boolean;
    }
  | {
      readonly type: "playerDrewFourCards";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "playerDrewTwoCards";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "playerJoined";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "playerLeft";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "playerReturnedCard";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "playerWonGame";
      readonly id: string;
      readonly username: string;
      readonly score: number;
    }
  | {
      readonly type: "playerWonRound";
      readonly id: string;
      readonly username: string;
      readonly score: number;
    }
  | {
      readonly type: "returnedCard";
      readonly id: string;
      readonly cardId: string;
    }
  | {
      readonly type: "turnChanged";
      readonly id: string;
      readonly currentPlayerUsername: string;
    };
