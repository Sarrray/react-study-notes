import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import { TReceiveContent } from "./type";

export type TServices = {
  start(): Promise<void>;
  stop(): Promise<void>;
  onReceiveHandler(handler: (content: TReceiveContent) => void): void;
  onStateChangeHandler(handler: (state: HubConnectionState) => void): void;
};

export const createSignalRService = (): TServices => {
  const connection = new HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_SIGNALR_SERVER_URL}/hub`)
    .withAutomaticReconnect()
    .build();

  const receiveHandlers: ((content: TReceiveContent) => void)[] = [];
  const stateHandlers: ((state: HubConnectionState) => void)[] = [];

  connection.on(
    "ReceiveContent",
    (username: string, message: string, datetime: string) => {
      receiveHandlers.forEach((handler) =>
        handler({ username: username, message: message, datetime: datetime })
      );
    }
  );

  const updateStatus = (status: HubConnectionState) => {
    stateHandlers.forEach((handler) => handler(status));
  };

  return {
    async start(): Promise<void> {
      try {
        if (connection.state == HubConnectionState.Disconnected) {
          await connection.start();
        }
      } finally {
        updateStatus(connection.state);
      }
    },

    async stop(): Promise<void> {
      try {
        if (connection) {
          await connection.stop();
        }
      } finally {
        updateStatus(connection.state);
      }
    },

    onReceiveHandler(handler: (content: TReceiveContent) => void): void {
      receiveHandlers.push(handler);
    },

    onStateChangeHandler(handler: (state: HubConnectionState) => void) {
      stateHandlers.push(handler);
    },
  };
};
