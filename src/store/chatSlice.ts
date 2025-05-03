import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { IChatState, IMessage, IMessageInput } from "../types/chat";

const sampleRoomId = "サンプルルーム";
const sampleMessageId = uuidv4();

const initialState: IChatState = {
  rooms: {
    [sampleRoomId]: {
      id: sampleRoomId,
    },
  },
  messages: {
    [sampleRoomId]: [
      {
        id: sampleMessageId,
        roomId: sampleRoomId,
        userId: "aaa",
        username: "ユーザーA",
        content: "こんにちは！",
        timestamp: Date.now(),
      },
    ],
  },
  visitedRooms: [sampleRoomId],
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    // ルーム入室
    enterRoom: (state, action: PayloadAction<string>) => {
      const roomId = action.payload;
      if (!state.rooms[roomId]) {
        state.rooms[roomId] = {
          id: roomId,
        };
      }
      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }
      if (!state.visitedRooms.includes(roomId)) {
        state.visitedRooms.push(roomId);
      }
    },

    // チャット送信
    sendMessage: (state, action: PayloadAction<IMessageInput>) => {
      const { roomId, content, userId, username } = action.payload;

      if (!state.messages[roomId]) {
        state.messages[roomId] = [];
      }

      const newMessage: IMessage = {
        id: uuidv4(),
        roomId: roomId,
        userId: userId,
        username: username,
        content: content,
        timestamp: Date.now(),
      };

      state.messages[roomId].push(newMessage);
    },

    // ルーム履歴削除
    deleteRoom: (state, action: PayloadAction<string>) => {
      const roomId = action.payload;
      delete state.rooms[roomId];
      delete state.messages[roomId];
      state.visitedRooms = state.visitedRooms.filter((id) => id !== roomId);
    },

    // データリセット
    resetChat: () => {
      return initialState;
    },
  },
});

export const { enterRoom, sendMessage, deleteRoom, resetChat } =
  chatSlice.actions;
export default chatSlice.reducer;
