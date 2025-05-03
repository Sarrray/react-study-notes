import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import type { RootState } from "../store";
import * as messageFormat from "../utils/messageFormat";
import { sendMessage } from "../store/chatSlice";

export const useChat = (roomId: string | undefined) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messageListRef = useRef<HTMLDivElement>(null);

  const { messages, rooms } = useSelector((state: RootState) => state.chat);
  const user = useSelector((state: RootState) => state.user);

  // 一番下にスクロール
  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (messageListRef.current) {
        messageListRef.current.scrollTo({
          top: messageListRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 0);
  }, []);

  // ルームの存在チェックと問題ない場合は一番下のメッセージにスクロール
  useEffect(() => {
    if (!roomId || !rooms[roomId]) {
      navigate("/chat");
    } else {
      scrollToBottom();
    }
  }, [roomId, rooms, navigate, scrollToBottom]);

  // メッセージ送信
  const handleSendMessage = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!roomId || !user.id || !user.name) {
        return;
      }

      const sanitizedMessage = messageFormat.sanitizeMessage(message.trim());

      if (!sanitizedMessage) {
        return;
      }

      dispatch(
        sendMessage({
          content: sanitizedMessage,
          roomId: roomId,
          userId: user.id,
          username: user.name,
        })
      );
      setMessage("");
      scrollToBottom();
    },
    [message, roomId, user, dispatch, scrollToBottom]
  );

  // ルーム退出
  const handleLeaveRoom = useCallback(() => {
    navigate("/chat");
  }, [navigate]);

  // キー入力ハンドリング
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage(e as unknown as React.FormEvent);
      }
    },
    [handleSendMessage]
  );

  // タイムスタンプのフォーマット
  const formatTimestamp = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `今日 ${date.toLocaleTimeString()}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `昨日 ${date.toLocaleTimeString()}`;
    }
    return date.toLocaleString();
  }, []);

  return {
    message,
    setMessage,
    messages,
    rooms,
    user,
    handleSendMessage,
    handleLeaveRoom,
    handleKeyDown,
    formatMessageContent: messageFormat.formatMessageContent,
    formatTimestamp,
    messageListRef,
  };
};
