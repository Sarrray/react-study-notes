import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 90vh;
  padding: 20px;
  background-color: #f5f5f5;
  box-sizing: border-box;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding: 10px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MessageBubble = styled.div<{ $isCurrentUser: boolean }>`
  background-color: ${(props) => (props.$isCurrentUser ? "#e3f2fd" : "white")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  margin: 4px 0;
`;

export const MessageContainer = styled.div<{ $isCurrentUser: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.$isCurrentUser ? "flex-end" : "flex-start")};
  margin: 8px 0;
`;

export const MessageInput = styled.form`
  display: flex;
  gap: 10px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
`;

export const ScrollButtons = styled.div`
  position: fixed;
  right: 20px;
  bottom: 100px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  button {
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

export const Username = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-bottom: 4px;
`;

export const Timestamp = styled.span`
  font-size: 0.7rem;
  color: #999;
  margin-top: 2px;
`;
