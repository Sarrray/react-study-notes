import styled from "styled-components";

export const TopProductsContainer = styled.div``;

export const RankingTitle = styled.h4`
  margin: 0;
  display: flex;
  font-size: 1.1rem;

  &::before {
    content: "★";
    margin-right: 4px;
  }
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RankingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 2px dashed #ddd;
`;

export const ProductName = styled.span`
  flex: 1;
  font-weight: bold;
`;

export const ProductAmount = styled.span`
  font-weight: bold;
`;

export const RankIconContainer = styled.div`
  position: relative;
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

export const RankNumber = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-family: "Bookman Old Style; Calisto MT";
  font-weight: bold;
  font-size: 0.8rem;
`;

export const TfiCrownProps = {
  width: "100%",
  height: "100%",
  opacity: 0.5,
  margin: 0,
  padding: 0,
};
