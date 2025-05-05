import {
  IDailySales,
  IMonthlySalesAmount,
  IMonthlyTarget,
  IPerformance,
  ITopProduct,
  TProductSalesChart,
} from "../types/sales";
import { formatDate } from "../utils/formatDate";

type TDayOrMonthKbn = "Day" | "Month";

// 本日または当月の総売上高取得
const getTotalSales = (
  data: IDailySales[],
  kbn: TDayOrMonthKbn,
  targetDate: string
): number => {
  const filterMap: Record<TDayOrMonthKbn, (x: IDailySales) => boolean> = {
    Day: (x) => x.date == targetDate,
    Month: (x) => x.date.slice(0, 6) === targetDate.slice(0, 6),
  };

  const d = data.filter(filterMap[kbn]);
  const sales = d.reduce(
    (acc, cur) =>
      acc + Object.values(cur.products).reduce((a2, c2) => a2 + c2, 0),
    0
  );

  return sales;
};

// 当年の各月の売上高
const getMonthlySales = (
  data: IDailySales[],
  targetDate: string
): IMonthlySalesAmount[] => {
  const yearData = data.filter(
    (x) => x.date.slice(0, 4) === targetDate.slice(0, 4)
  );
  const perMonthAmount = new Map<number, number>();
  yearData.forEach((x) => {
    const month = Number(x.date.slice(4, 6));
    const amount = Object.values(x.products).reduce((acc, cur) => acc + cur, 0);
    perMonthAmount.set(month, (perMonthAmount.get(month) ?? 0) + amount);
  });

  return Array.from(perMonthAmount.entries()).map(([month, amount]) => ({
    month: month,
    amount: amount,
  }));
};

// 当年の各月の予実績
const getBudgetActualFullMonth = (
  target: IMonthlyTarget[],
  actual: IMonthlySalesAmount[],
  targetDate: string
): IPerformance[] => {
  const budgetactualdata: IPerformance[] = [];

  for (let i = 1; i <= 12; i++) {
    const month = i;

    const year = targetDate.slice(0, 4);
    const b =
      target.find(
        (x) => x.year === Number(targetDate.slice(0, 4)) && x.month === i
      )?.targetAmount ?? undefined;
    const a = actual.find((x) => x.month === i)?.amount ?? undefined;
    const g = a && b && (b ?? 0) != 0 ? Math.trunc((a / b) * 100) : undefined;

    budgetactualdata.push({
      year: Number(year),
      month: month,
      target: b,
      actual: a,
      achievementRate: g,
    });
  }

  return budgetactualdata;
};

// 月間の売上達成度
const getMonthlyAchievementlevel = (
  performance: IPerformance[],
  targetDate: string
): number => {
  return (
    performance.find(
      (x) =>
        x.year == Number(targetDate.slice(0, 4)) &&
        x.month == Number(targetDate.slice(4, 6))
    )?.achievementRate ?? 0
  );
};

// 年間の売上達成度
const getAnnualAchievementlevel = (performance: IPerformance[]): number => {
  const [totalTarget, totalActual] = performance.reduce(
    (acc, cur) => {
      acc[0] += cur.target ?? 0;
      acc[1] += cur.actual ?? 0;
      return acc;
    },
    [0, 0]
  );

  return Math.trunc((totalActual / totalTarget) * 100);
};

// 前営業日との売上高の差分
const getPreviousdayChange = (data: IDailySales[], targetDate: string) => {
  const d = data
    .filter((x) => x.date <= targetDate)
    .sort((a, b) => Number(b.date) - Number(a.date))
    .slice(0, 2);

  if (d.length != 0 && d[0].date === targetDate) {
    const n = Object.values(d[0].products).reduce((acc, cur) => acc + cur, 0);
    let p = 0;
    if (d[1]) {
      p = Object.values(d[1].products).reduce((acc, cur) => acc + cur, 0);
    }
    return n - p;
  }
  return 0;
};

// 前月の売上高の差分
const getPreviousMonthChange = (data: IDailySales[], targetDate: string) => {
  const thisMonthData = data.filter(
    (x) => x.date.slice(0, 6) === targetDate.slice(0, 6)
  );
  const prevDate = new Date(formatDate(targetDate, "hyphen-yyyyMMdd"));
  prevDate.setMonth(prevDate.getMonth() - 1); // TODO：月末ずれる
  const prevMonthData = data.filter(
    (x) =>
      Number(x.date.slice(0, 4)) === prevDate.getFullYear() &&
      Number(x.date.slice(4, 6)) === prevDate.getMonth() + 1
  );

  const getTotal = (x: IDailySales[]) => {
    return x.reduce(
      (acc, cur) =>
        acc + Object.values(cur.products).reduce((a2, c2) => a2 + c2, 0),
      0
    );
  };

  const thisMonthTotal = getTotal(thisMonthData);
  const prevMonthTotal = getTotal(prevMonthData);
  return thisMonthTotal - prevMonthTotal;
};

// 5日間のTOP3の商品
const getRecentTopProducts = (
  data: IDailySales[],
  targetDate: string
): ITopProduct[] => {
  const periodX = 5; // 5日間
  const topX = 3; // top3
  const recentData = data
    .filter((x) => x.date <= targetDate)
    .sort((a, b) => Number(a.date) - Number(b.date))
    .slice(-periodX);

  if (!recentData) {
    return [];
  }

  const totals: { [ProductName: string]: number } = {};
  recentData.forEach((x) => {
    Object.entries(x.products).forEach(([name, amount]) => {
      totals[name] = (totals[name] ?? 0) + amount;
    });
  });

  const result = Object.entries(totals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, topX)
    .map(([name, amount], index) => ({
      rank: index + 1,
      name: name,
      amount: amount,
    }));

  return result;
};

// 当日のTOP3の商品
const getTodayTopProducts = (
  data: IDailySales[],
  targetDate: string
): ITopProduct[] => {
  const topX = 3; // top3
  const d = data.find((x) => x.date === targetDate);
  if (!d) {
    return [];
  }
  return Object.entries(d.products)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topX)
    .map((x, index) => ({ rank: index + 1, name: x[0], amount: x[1] }));
};

// ProductSalesChart用の直近5日間の売上高
const getProductSalesChartData = (
  data: IDailySales[],
  targetDate: string
): TProductSalesChart[] => {
  const periodX = 5; // 5日間
  const recentData = data
    .filter((x) => x.date <= targetDate)
    .sort((a, b) => Number(a.date) - Number(b.date))
    .slice(-periodX);

  if (!recentData) {
    return [];
  }
  const structuredRecentData: TProductSalesChart[] = recentData.map((d) =>
    Object.assign({ date: formatDate(d.date, "jp-Md") }, d.products)
  );

  return structuredRecentData;
};

export {
  getTotalSales,
  getMonthlySales,
  getBudgetActualFullMonth,
  getMonthlyAchievementlevel,
  getAnnualAchievementlevel,
  getPreviousdayChange,
  getPreviousMonthChange,
  getRecentTopProducts,
  getTodayTopProducts,
  getProductSalesChartData,
};
