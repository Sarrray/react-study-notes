import DoughnutChart from "../common/DoughnutChart";
import * as S from "./styles";

interface ISalesSummaryCardProps {
  title: string;
  value: number;
  toplabel: string;
  bottomlabel: string;
  insideGraphTopLabel: string;
  insideGraphBottomLabel: string;
  circleColor: string[];
}

const SalesSummaryCard = ({
  title,
  value,
  toplabel,
  bottomlabel,
  insideGraphTopLabel,
  insideGraphBottomLabel,
  circleColor,
}: ISalesSummaryCardProps) => {
  return (
    <>
      <S.SalesSummaryCard>
        <div className="item1">
          <S.SectionTitle>{title}</S.SectionTitle>
        </div>
        <div className="item2">{toplabel}</div>
        <div className="item3">{bottomlabel}</div>
        <div className="item4">
          <DoughnutChart
            value={value}
            insideTopLabel={insideGraphTopLabel}
            insideBottomLabel={insideGraphBottomLabel}
            colors={circleColor}
            size={170}
          />
        </div>
      </S.SalesSummaryCard>
    </>
  );
};

export default SalesSummaryCard;
