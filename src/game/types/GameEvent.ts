import type { Card, DiscardedCard } from "./Card.js";
import type { ChatMessage } from "./ChatMessage.js";

export type GameEvent =
  | {
      readonly type: "adminChanged";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "cardDiscarded";
      readonly id: string;
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
      readonly type: "otherPlayerCardDealt";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerDrewCard";
      readonly id: string;
      readonly username: string;
      readonly isPlayable: boolean;
    }
  | {
      readonly type: "otherPlayerDrewFourCards";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerDrewTwoCards";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerJoined";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerLeft";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerPlayedCard";
      readonly id: string;
      readonly username: string;
      readonly card: DiscardedCard;
    }
  | {
      readonly type: "otherPlayerReturnedCard";
      readonly id: string;
      readonly username: string;
    }
  | {
      readonly type: "otherPlayerWonGame";
      readonly id: string;
      readonly username: string;
      readonly score: number;
    }
  | {
      readonly type: "otherPlayerWonRound";
      readonly id: string;
      readonly username: string;
      readonly score: number;
    }
  | {
      readonly type: "playerCardDealt";
      readonly id: string;
      readonly card: Card;
    }
  | {
      readonly type: "playerDrewCard";
      readonly id: string;
      readonly card: Card;
    }
  | {
      readonly type: "playerDrewFourCards";
      readonly id: string;
      readonly cards: readonly Card[];
    }
  | {
      readonly type: "playerDrewTwoCards";
      readonly id: string;
      readonly cards: readonly Card[];
    }
  | {
      readonly type: "playerPlayedCard";
      readonly id: string;
      readonly card: DiscardedCard;
    }
  | {
      readonly type: "playerReturnedCard";
      readonly id: string;
      readonly cardId: string;
    }
  | {
      readonly type: "playerWonGame";
      readonly id: string;
      readonly score: number;
    }
  | {
      readonly type: "playerWonRound";
      readonly id: string;
      readonly score: number;
    }
  | {
      readonly type: "turnChanged";
      readonly id: string;
      readonly currentPlayerUsername: string;
    };
