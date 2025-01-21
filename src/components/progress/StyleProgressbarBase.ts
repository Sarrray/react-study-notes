import styled from "styled-components";

const divProgressbarBase = styled.div`
  width: 100%;
  height: 10px;
  background-color: #f3f3f3;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const divProgressbarInnerBase = styled.div<{ $progress: number }>`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease-in-out;
`;

export { divProgressbarBase, divProgressbarInnerBase };
