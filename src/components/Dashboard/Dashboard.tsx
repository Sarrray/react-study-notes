import { useState } from "react";
import DatePicker from "./DatePicker";
import { RiFileInfoFill } from "react-icons/ri";
import SalesSummaryCard from "./SalesSummaryCard";
import PerformanceChart from "./PerformanceChart";
import * as S from "./styles";
import ProductSalesChart from "./ProductSalesChart";
import TopProducts from "./TopProducts";
import { useSalesData } from "../../hooks/useSalesData";

const Dashboard = () => {
  const [baseDate, setBaseDate] = useState("2025/01/10");
  const { dashboardData } = useSalesData(baseDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBaseDate(e.target.value);
  };

  // SalesSummaryCard（当日）
  const SalesSummaryCardDay = {
    title: "本日の売上高",
    value: dashboardData?.summary.monthlyAchievementRate ?? 0,
    toplabel: `${(dashboardData?.summary.dailyAmount ?? 0).toLocaleString()}円`,
    bottomlabel: `前営比(${
      0 <= (dashboardData?.summary.previousDayDiff ?? 0) ? "+" : ""
    }${(dashboardData?.summary.previousDayDiff ?? 0).toLocaleString()}円)`,
    insideGraphTopLabel: "月間達成度",
    insideGraphBottomLabel: `${
      dashboardData?.summary.monthlyAchievementRate ?? 0
    }%`,
    circleColor: ["#ff708f", "#e7e7ea"],
    size: 170,
  };

  // SalesSummaryCard（当月）
  const SalesSummaryCardMonth = {
    title: "今月の売上高",
    value: dashboardData?.summary.yearlyAchievementRate ?? 0,
    toplabel: `${(
      dashboardData?.summary.monthlyAmount ?? 0
    ).toLocaleString()}円`,
    bottomlabel: `前月比(${
      0 <= (dashboardData?.summary.previousMonthDiff ?? 0) ? "+" : ""
    }${(dashboardData?.summary.previousMonthDiff ?? 0).toLocaleString()}円)`,
    insideGraphTopLabel: "年間達成度",
    insideGraphBottomLabel: `${
      dashboardData?.summary.yearlyAchievementRate ?? 0
    }%`,
    circleColor: ["#7397e6", "#e7e7ea"],
    size: 170,
  };

  return (
    <S.DashboardContainer>
      <S.HeaderContainer>
        <S.DatePickerContainer>
          <S.Label>基準日：</S.Label>
          <DatePicker value={baseDate} onChange={handleDateChange} />
          <S.DateNote>← 【確認用】データ登録されている日付のみ表示</S.DateNote>
        </S.DatePickerContainer>
        <S.HoverNote>
          <RiFileInfoFill {...S.HoverInfoIcon} />
          予実績と商品別の売上のグラフはマウスホバーで詳細を表示
        </S.HoverNote>
      </S.HeaderContainer>
      <S.TopSection>
        <SalesSummaryCard {...SalesSummaryCardDay} />
        <SalesSummaryCard {...SalesSummaryCardMonth} />
        <PerformanceChart date={dashboardData?.dailyPerformance ?? []} />
      </S.TopSection>
      <S.BottomSection>
        <S.SectionTitle>商品別の売上</S.SectionTitle>
        <S.ProductSalesChart>
          <ProductSalesChart data={dashboardData?.productSalesChart ?? []} />
          <TopProducts
            key={1}
            todaysTopProducts={dashboardData?.todaysTopProducts ?? []}
            title="本日の売上TOP3"
          />
          <TopProducts
            key={2}
            todaysTopProducts={dashboardData?.recentTopProducts ?? []}
            title="直近5営業日の売上TOP3"
          />
        </S.ProductSalesChart>
      </S.BottomSection>
    </S.DashboardContainer>
  );
};

export default Dashboard;
