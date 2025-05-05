import { useEffect, useState } from "react";
import { IDailySales, IDashboardData, IMonthlyTarget } from "../types/sales";
import { formatDate } from "../utils/formatDate";
import dailySalesData from "../data/dailySales.json";
import monthlyTargetsData from "../data/monthlyTargets.json";
import {
  getAnnualAchievementlevel,
  getBudgetActualFullMonth,
  getRecentTopProducts,
  getMonthlyAchievementlevel,
  getMonthlySales,
  getPreviousdayChange,
  getPreviousMonthChange,
  getTodayTopProducts,
  getTotalSales,
  getProductSalesChartData,
} from "../services/sales";

export const useSalesData = (baseDate: string) => {
  const [dashboardData, setDashboardData] = useState<IDashboardData | null>(
    null
  );

  useEffect(() => {
    const calculateDashboardData = () => {
      if (baseDate) {
        const currentDate = formatDate(baseDate, "yyyyMMdd");

        // 日次売上データの取得
        const dailySales = dailySalesData as IDailySales[];

        // 月間目標データの取得
        const monthlyTarget = monthlyTargetsData as IMonthlyTarget[];

        // 当年の各月の売上高
        const performance = getMonthlySales(dailySales, currentDate);

        // 当年の各月の予実績
        const dailyPerformance = getBudgetActualFullMonth(
          monthlyTarget,
          performance,
          currentDate
        );

        // 当日の売上高
        const dailyAmount = getTotalSales(dailySales, "Day", currentDate);
        // 前営業日との売上高の差分
        const previousDayDiff = getPreviousdayChange(dailySales, currentDate);
        // 当月の売上高
        const monthlyAmount = getTotalSales(dailySales, "Month", currentDate);
        // 前月の売上高の差分
        const previousMonthDiff = getPreviousMonthChange(
          dailySales,
          currentDate
        );
        // 月間の売上達成度
        const monthlyAchievementRate = getMonthlyAchievementlevel(
          dailyPerformance,
          currentDate
        );
        // 年間の売上達成度
        const yearlyAchievementRate =
          getAnnualAchievementlevel(dailyPerformance);
        // 本日のTOP商品
        const todaysTopProducts = getTodayTopProducts(dailySales, currentDate);
        // 直近の売上TOP商品
        const recentTopProducts = getRecentTopProducts(dailySales, currentDate);
        // ProductSalesChart用の直近5日間の売上高
        const productSalesChart = getProductSalesChartData(
          dailySales,
          currentDate
        );

        setDashboardData({
          summary: {
            date: baseDate,
            dailyAmount: dailyAmount,
            previousDayDiff: previousDayDiff,
            monthlyAmount: monthlyAmount,
            previousMonthDiff: previousMonthDiff,
            monthlyAchievementRate: monthlyAchievementRate,
            yearlyAchievementRate: yearlyAchievementRate,
          },
          dailyPerformance: dailyPerformance,
          todaysTopProducts: todaysTopProducts,
          recentTopProducts: recentTopProducts,
          productSalesChart: productSalesChart,
        });
      }
    };
    calculateDashboardData();
  }, [baseDate]);

  return { dashboardData };
};
