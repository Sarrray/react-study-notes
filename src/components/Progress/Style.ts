import styled from "styled-components";

const divProgressbar = styled.div<{ $linethickness: number }>`
  width: 100%;
  height: ${(props) => props.$linethickness}px;
  background-color: #eeeeee;
  border-radius: 5px;
  overflow: hidden;
`;

const divProgressbarInner = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.$progress}px;
  transition: width 0.2s ease-in-out;
`;

const divCircle = styled.div<{ $size: number; $done: boolean }>`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.$done ? "#4caf50" : "#ffffff")};
  border: 1px solid #4caf50;
  border-radius: 50%;
  width: ${(props) => props.$size}px;
  height: ${(props) => props.$size}px;
  color: ${(props) => (props.$done ? "#ffffff" : "#4caf50")};
`;

export { divProgressbar, divProgressbarInner, divCircle };
