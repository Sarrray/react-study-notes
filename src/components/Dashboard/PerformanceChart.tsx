import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { IPerformance } from "../../types/sales";
import * as S from "./styles";

interface PerformanceChartProps {
  date: IPerformance[];
}

const COLORS = ["#cccccc", "#8bc34a", "#ff9800"];

const PerformanceChart = ({ date }: PerformanceChartProps) => {
  const transformedData = date.map((item) => ({
    name: `${item.month}月`,
    予算: item.target,
    実績: item.actual,
    達成度: item.achievementRate,
  }));

  return (
    <>
      <S.PerformanceChartContainer>
        <S.SectionTitle>予実績</S.SectionTitle>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={transformedData}
            margin={{ top: 10, right: 20, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "#000000" }} />
            <YAxis
              yAxisId="left"
              orientation="left"
              label={{
                value: "売上金額 (円)",
                angle: -90,
                position: "insideLeft",
                offset: -30,
                dy: 40,
                fill: "#000000",
              }}
              tick={{ fill: "#000", fontSize: "0.9rem" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              label={{
                value: "達成度 (%)",
                angle: 90,
                position: "insideRight",
                offset: 5, // 水平方向の調整
                dy: 40, // 垂直方向の調整
                fill: "#000000",
              }}
              tick={{ fill: "#000000", fontSize: "0.9rem" }}
            />
            <Tooltip content={<CustomTooltip colors={COLORS} />} />
            <Legend content={<CustomLegend colors={COLORS} />} />
            <Bar yAxisId="left" dataKey="予算" fill={COLORS[0]} />
            <Bar yAxisId="left" dataKey="実績" fill={COLORS[1]} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="達成度"
              stroke={COLORS[2]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </S.PerformanceChartContainer>
    </>
  );
};

interface ICustomTooltipProps extends TooltipProps<number, string> {
  colors: string[];
}
const CustomTooltip = ({
  active,
  payload,
  label,
  colors,
}: ICustomTooltipProps) => {
  if (!active || !payload || !payload.length) return null;

  // payload[0]は予算、payload[1]は実績、payload[2]は達成度
  const target = payload[0]?.value;
  const actual = payload[1]?.value;
  const achievementRate = payload[2]?.value;

  return (
    <S.CustomTooltipContainer>
      <S.TooltipTitle>{label}</S.TooltipTitle>
      <S.TooltipContent>
        {target && (
          <S.TooltipRow>
            <S.TooltipItem $color={colors[0]}>予算</S.TooltipItem>
            <span>
              <S.TooltipColon>:</S.TooltipColon>
              {target?.toLocaleString()}円
            </span>
          </S.TooltipRow>
        )}
        {actual && (
          <S.TooltipRow>
            <S.TooltipItem $color={colors[1]}>実績</S.TooltipItem>
            <span>
              <S.TooltipColon>:</S.TooltipColon>
              {actual?.toLocaleString()}円
            </span>
          </S.TooltipRow>
        )}
        {achievementRate && (
          <S.TooltipRow>
            <S.TooltipItem $color={colors[2]}>達成度</S.TooltipItem>
            <span>
              <S.TooltipColon>:</S.TooltipColon>
              {achievementRate}%
            </span>
          </S.TooltipRow>
        )}
      </S.TooltipContent>
    </S.CustomTooltipContainer>
  );
};

interface ICustomLegendProps {
  colors: string[];
}
const CustomLegend = ({ colors }: ICustomLegendProps) => {
  return (
    <S.LegendContainer>
      <S.LegendItem>
        <S.LegendIcon color={colors[0]} />
        <S.LegendText>予算</S.LegendText>
      </S.LegendItem>
      <S.LegendItem>
        <S.LegendIcon color={colors[1]} />
        <S.LegendText>実績</S.LegendText>
      </S.LegendItem>
      <S.LegendItem>
        <AchievementMarker color={colors[2]} />
        <S.LegendText>達成度</S.LegendText>
      </S.LegendItem>
    </S.LegendContainer>
  );
};

interface IAchievementMarkerProps {
  color: string;
}
const AchievementMarker = ({ color }: IAchievementMarkerProps) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 32 32"
      style={{ marginRight: "5px" }}
    >
      <path
        strokeWidth={4}
        fill="none"
        stroke={color}
        d="M0,16h10.666666666666666
  A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
  H32M21.333333333333332,16
  A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
      ></path>
    </svg>
  );
};

export default PerformanceChart;
