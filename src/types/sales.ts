// 日次売上データ
export interface IDailySales {
  date: string; // yyyyMMdd形式
  products: Record<string, number>; // 商品名：売上額
}

// 月次売上データ
export interface IMonthlySalesAmount {
  month: number; // 1-12
  amount: number;
}

// 月次目標データ
export interface IMonthlyTarget {
  year: number;
  month: number; // 1-12
  targetAmount: number;
}

// 売上集計データ
export interface ISalesSummary {
  date: string;
  dailyAmount: number;
  previousDayDiff: number;
  monthlyAmount: number;
  previousMonthDiff: number;
  monthlyAchievementRate: number;
  yearlyAchievementRate: number;
}

// 予実績データ
export interface IPerformance {
  year: number;
  month: number; // 1-12
  target: number | undefined;
  actual: number | undefined;
  achievementRate: number | undefined;
}

// TOP商品データ
export interface ITopProduct {
  rank: number;
  name: string;
  amount: number;
}

// ProductSalesChart用
export type TProductSalesChart = {
  date: string;
} & Record<Exclude<string, "date">, number>;

// ダッシュボードデータ
export interface IDashboardData {
  summary: ISalesSummary;
  dailyPerformance: IPerformance[];
  todaysTopProducts: ITopProduct[];
  recentTopProducts: ITopProduct[];
  productSalesChart: TProductSalesChart[];
}
