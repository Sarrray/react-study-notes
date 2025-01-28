import { HubConnectionState } from "@microsoft/signalr";
import { useCallback, useEffect, useState } from "react";
import { TReceiveContent } from "./type";
import { createSignalRService, TServices } from "./services";

export const useSignalR = () => {
  const [connectionState, setConnectionState] = useState<HubConnectionState>(
    HubConnectionState.Disconnected
  );
  const [receiveContent, setReceive] = useState<TReceiveContent[]>([]);
  const [services, setServices] = useState<TServices | undefined>(undefined);
  const [currentMsg, setCurrentMsg] = useState("");
  // ※StrictModeが有効な場合の対策として、services の初期値はundefinedにする
  // StrictModeが有効な場合、最初のレンダリングではstateは更新されない
  // 最初のレンダリングでconnectionのstart⇒stopを行うと、connecting状態のまま stopが呼ばれてしまいエラーとなるため、
  // servicesがundefinedでない場合のみstart⇒stopを行うようにし、最初のレンダリングでそれを実行しないように制御する

  useEffect(() => {
    setServices(createSignalRService);
  }, []);

  useEffect(() => {
    if (services) {
      const handleReceivecontent = (content: TReceiveContent) => {
        setReceive((prev) => [...prev, content]);
      };

      const handleStateChange = (state: HubConnectionState) => {
        setConnectionState(state);
      };

      services.onReceiveHandler(handleReceivecontent);
      services.onStateChangeHandler(handleStateChange);

      services
        .start()
        .catch((err) => console.log("useSignalR start error", err));
    }

    return () => {
      if (services) {
        services
          .stop()
          .catch((err) => console.log("useSignalR stop error", err));
      }
    };
  }, [services]);

  const stopConnection = useCallback(() => {
    services?.stop();
  }, [services]);

  useEffect(() => {
    if (receiveContent.length > 0) {
      const d = [...receiveContent].sort(
        (a, b) =>
          new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      )[0];
      setCurrentMsg(d.message);
    }
  }, [receiveContent]);

  return {
    connectionState,
    receiveContent,
    stopConnection,
    currentMsg,
  };
};
