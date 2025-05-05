import styled from "styled-components";

// カスタムレジェンドチップのスタイル
export const LegendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const LegendIcon = styled.div<{ color: string }>`
  width: 20px;
  height: 10px;
  background-color: ${(props) => props.color};
  border: 1px solid #aaaaaa;
`;

export const LegendText = styled.span`
  color: #000000;
`;
