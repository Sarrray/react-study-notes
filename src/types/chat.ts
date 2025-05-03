export interface IMessage {
  id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

export interface IRoom {
  id: string;
}

export interface IChatState {
  rooms: Record<string, IRoom>;
  messages: Record<string, IMessage[]>;
  visitedRooms: string[];
}

export interface IMessageInput {
  content: string;
  roomId: string;
  userId: string;
  username: string;
}
