import styled from "styled-components";

// 売上カード
const SalesSummaryCardBase = styled.div<{
  $margin?: string;
  $padding?: string;
}>`
  margin: ${(props) => props.$margin ?? `0`};
  padding: ${(props) => props.$padding ?? `10px`};
  border: 1px solid ${(props) => props.theme.color.border};
  box-shadow: 0px 3px 3px ${(props) => props.theme.color.contentShadow};
  line-height: 1.5;

  h3 {
    &:before {
      content: "■";
    }
    margin: 0;
  }
`;

export const SalesSummaryCard = styled(SalesSummaryCardBase)`
  display: grid;
  grid-template-rows: 0.8fr 0.8fr 0.8fr 3.5fr;
  grid-template-columns: 1fr;
  background-color: #ffffff;
  width: 200px;

  /* .item1 {
    grid-row: 1;
    grid-column: 1;
    font-weight: bold;
    padding-left: 5px;
    white-space: nowrap;
    align-items: center;
  } */
  .item2 {
    display: grid;
    grid-row: 2;
    grid-column: 1;
    justify-content: center;
    font-size: 1.4rem;
    font-weight: bold;
    align-items: end;
  }
  .item3 {
    display: grid;
    grid-row: 3;
    grid-column: 1;
    font-size: 0.9rem;
    justify-content: center;
    align-items: center;
  }
  .item4 {
    display: grid;
    grid-row: 4;
    grid-column: 1/3;
    align-items: center;
    justify-content: center;
  }
`;
