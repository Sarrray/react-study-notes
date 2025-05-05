import { PieChart, Pie, Cell, Label } from "recharts";

interface IDoughnutChartProps {
  value: number;
  insideTopLabel: string;
  insideBottomLabel: string;
  colors: string[];
  size: number;
}

const DoughnutChart = ({
  value,
  insideTopLabel,
  insideBottomLabel,
  colors,
  size,
}: IDoughnutChartProps) => {
  const data = [
    { name: "hontai", value: value },
    { name: "sonota", value: 100 - value },
  ];
  return (
    <>
      <PieChart width={size} height={size}>
        <Pie
          data={data}
          cx={size / 2}
          cy={size / 2}
          innerRadius={"80%"}
          outerRadius={"100%"}
          paddingAngle={0}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}

          <>
            <Label
              value={insideTopLabel}
              position="centerTop"
              fontSize="1rem"
              style={{ transform: "translateY(-20px)" }}
              fill="#666"
            />
            <Label
              value={insideBottomLabel}
              position="centerBottom"
              fontSize="1.3rem"
              style={{ transform: "translateY(25px)" }}
              fill="#666"
            />
          </>
        </Pie>
      </PieChart>
    </>
  );
};

export default DoughnutChart;
