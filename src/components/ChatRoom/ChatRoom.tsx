import * as S from "./Style";
import { TextField, Button, Typography, List, ListItem } from "@mui/material";
import { useParams } from "react-router-dom";
import { useChat } from "../../hooks/useChat";

const ChatRoom = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const {
    message,
    setMessage,
    messages,
    rooms,
    user,
    handleSendMessage,
    handleLeaveRoom,
    handleKeyDown,
    formatTimestamp,
    messageListRef,
  } = useChat(roomId);

  if (!roomId || !rooms[roomId]) {
    return null;
  }

  const roomMessages = messages[roomId] || [];

  return (
    <S.Container>
      <S.Header>
        <Typography variant="h6">
          ルーム: {roomId} (メッセージ数: {messages[roomId]?.length ?? 0})
        </Typography>
        <Button variant="outlined" onClick={handleLeaveRoom}>
          退室
        </Button>
      </S.Header>

      <S.MessageList ref={messageListRef}>
        {roomMessages.length === 0 ? (
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.secondary", py: 2 }}
          >
            メッセージはまだありません
          </Typography>
        ) : (
          <List>
            {roomMessages.map((msg) => {
              const isCurrentUser = msg.username === user.name;
              return (
                <ListItem
                  key={msg.id}
                  sx={{ display: "block", padding: "4px 0" }}
                >
                  <S.MessageContainer $isCurrentUser={isCurrentUser}>
                    <S.Username>
                      {isCurrentUser ? "あなた" : msg.username}
                    </S.Username>
                    <S.MessageBubble $isCurrentUser={isCurrentUser}>
                      <Typography style={{ whiteSpace: "pre-wrap" }}>
                        {msg.content}
                      </Typography>
                    </S.MessageBubble>
                    <S.Timestamp>{formatTimestamp(msg.timestamp)}</S.Timestamp>
                  </S.MessageContainer>
                </ListItem>
              );
            })}
          </List>
        )}
        <div />
      </S.MessageList>

      <S.MessageInput onSubmit={handleSendMessage}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="メッセージを入力 (Shift + Enter で改行)"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!message.trim()}
          sx={{ minWidth: "80px" }}
        >
          送信
        </Button>
      </S.MessageInput>
    </S.Container>
  );
};

export default ChatRoom;
