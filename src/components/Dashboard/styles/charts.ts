import styled from "styled-components";

// チャート共通
export const ChartContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
`;

// 予実績チャート
export const PerformanceChartContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 10px;
  box-shadow: 0px 3px 3px ${(props) => props.theme.color.contentShadow};
  border: 1px solid ${(props) => props.theme.color.border};
`;

//
export const ProductSalesChart = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 2.3fr 1fr;
  row-gap: 10px;
`;

// 商品別の売上チャート
export const ProductChartContainer = styled.div`
  grid-row: 1/3;
`;
