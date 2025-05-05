import styled from "styled-components";

// カスタムツールチップのスタイル
export const CustomTooltipContainer = styled.div`
  background-color: #ffffff;
  padding: 12px 16px;
  border: 1px solid #aaaaaa;
  min-width: 150px;
  position: relative;
`;

export const TooltipTitle = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.color.border};
  padding-bottom: 5px;
`;

export const TooltipItem = styled.span<{ $color: string }>`
  &&::before {
    content: "■";
    margin-right: 3px;
    color: ${(props) => props.$color};
  }
`;

export const TooltipContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const TooltipRow = styled.div`
  display: flex;
  justify-content: start;

  span:first-child {
    width: 70px;
  }
`;

export const TooltipColon = styled.span`
  padding: 0 10px;
`;
