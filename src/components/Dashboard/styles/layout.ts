import styled from "styled-components";

// 全体のコンテナ
export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// ヘッダー
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DatePickerContainer = styled.div`
  /* display: flex;
  align-items: center; */
`;

export const Label = styled.label`
  font-weight: bold;
  margin-right: 8px;
`;

export const DateNote = styled.span`
  margin-left: 8px;
  font-size: 0.9rem;
`;

export const HoverNote = styled.div`
  display: flex;
  font-size: 0.9rem;
  align-items: center;
`;

// セクション分け
export const TopSection = styled.div`
  display: flex;
  gap: 15px;
`;

export const BottomSection = styled.div`
  border: 1px solid ${(props) => props.theme.color.border};
  box-shadow: 0px 3px 3px ${(props) => props.theme.color.contentShadow};
  padding: 16px;
`;

// 共通タイトル
export const SectionTitle = styled.h3`
  margin: 0;
  font-weight: bold;
  display: flex;
  align-items: center;

  &::before {
    content: "■";
    margin-right: 4px;
    color: #333;
  }
`;

// アイコンサイズ
export const HoverInfoIcon = {
  size: 25,
  color: "#555",
};
