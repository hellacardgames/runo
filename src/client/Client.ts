import type { Color } from "../game/index.js";
import type { Server } from "../server/index.js";

export class Client {
  private readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async createGame(accessToken: string) {
    const response = await fetch(`${this.baseUrl}/createGame`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const result: ReturnType<Server["createGame"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async drawCard(gameId: string, playerId: string) {
    const response = await fetch(`${this.baseUrl}/drawCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId }),
    });
    const result: ReturnType<Server["drawCard"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async getClientStateAndClearEvents(gameId: string, playerId: string) {
    const response = await fetch(
      `${this.baseUrl}/getClientStateAndClearEvents`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId }),
      },
    );
    const result: ReturnType<Server["getClientStateAndClearEvents"]> =
      await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async getEventsAndClearAcknowledged(
    gameId: string,
    playerId: string,
    lastReadId: string | null,
  ) {
    const response = await fetch(
      `${this.baseUrl}/getEventsAndClearAcknowledged`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gameId, playerId, lastReadId }),
      },
    );
    const result: ReturnType<Server["getEventsAndClearAcknowledged"]> =
      await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async getJoinableGames() {
    const response = await fetch(`${this.baseUrl}/getJoinableGames`, {
      method: "POST",
    });
    const result: ReturnType<Server["getJoinableGames"]> =
      await response.json();
    return result;
  }

  async joinGame(gameId: string, accessToken: string) {
    const response = await fetch(`${this.baseUrl}/joinGame`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId }),
    });
    const result: ReturnType<Server["joinGame"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async leaveGame(gameId: string, playerId: string) {
    const response = await fetch(`${this.baseUrl}/leaveGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId }),
    });
    const result: ReturnType<Server["leaveGame"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async playCard(gameId: string, playerId: string, cardId: string) {
    const response = await fetch(`${this.baseUrl}/playCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId, cardId }),
    });
    const result: ReturnType<Server["playCard"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async playWildCard(
    gameId: string,
    playerId: string,
    cardId: string,
    color: Color,
  ) {
    const response = await fetch(`${this.baseUrl}/playWildCard`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId, cardId, color }),
    });
    const result: ReturnType<Server["playWildCard"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async sendChat(gameId: string, playerId: string, text: string) {
    const response = await fetch(`${this.baseUrl}/sendChat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId, text }),
    });
    const result: ReturnType<Server["sendChat"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }

  async startGame(gameId: string, playerId: string) {
    const response = await fetch(`${this.baseUrl}/startGame`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, playerId }),
    });
    const result: ReturnType<Server["startGame"]> = await response.json();
    if (!result.success) {
      return { success: false, error: result.error } as const;
    }
    return result;
  }
}
