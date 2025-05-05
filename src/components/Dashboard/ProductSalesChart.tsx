import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
  LegendProps,
} from "recharts";
import * as S from "./styles";
import { TProductSalesChart } from "../../types/sales";

const COLORS = {
  いちご: "#ff8da3",
  みかん: "#a85200",
  もも: "#eab999",
  りんご: "#e04e53",
  れもん: "#f4d002",
  すいか: "#00936e",
  ぶどう: "#9b66b8",
  その他: "#aaaaaa",
};
type TColorKeys = keyof typeof COLORS;
const getColor = (key: string) => COLORS[key as TColorKeys] ?? COLORS["その他"];

interface IProductSalesChartProps {
  data: TProductSalesChart[];
}
const ProductSalesChart = ({ data }: IProductSalesChartProps) => {
  // 商品名のみのデータ作成
  const productNames = new Set<string>();
  for (const { date: _date, ...products } of data) {
    Object.keys(products).forEach((productName) =>
      productNames.add(productName)
    );
  }

  return (
    <S.ProductChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          stackOffset="sign"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: "#000000" }} />
          <YAxis tick={{ fill: "#000000" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          {Array.from(productNames).map((product) => (
            <Bar
              key={product}
              dataKey={product}
              stackId="a"
              fill={getColor(product)}
              maxBarSize={70}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </S.ProductChartContainer>
  );
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <S.CustomTooltipContainer>
      <S.TooltipTitle>{label}</S.TooltipTitle>
      <S.TooltipContent>
        {payload.map(({ name, value }) => {
          return (
            <div key={name}>
              <S.TooltipRow>
                <S.TooltipItem $color={getColor(name ?? "")}>
                  {name}
                </S.TooltipItem>
                <span>
                  <S.TooltipColon>:</S.TooltipColon>
                  {value?.toLocaleString()}円
                </span>
              </S.TooltipRow>
            </div>
          );
        })}
      </S.TooltipContent>
    </S.CustomTooltipContainer>
  );
};

const CustomLegend = ({ payload }: LegendProps) => {
  if (!payload) {
    return null;
  }

  return (
    <S.LegendContainer>
      {payload.map(({ value }) => {
        return (
          <S.LegendItem key={value}>
            <S.LegendIcon color={getColor(value)} />
            <S.LegendText>{value}</S.LegendText>
          </S.LegendItem>
        );
      })}
    </S.LegendContainer>
  );
};

export default ProductSalesChart;
