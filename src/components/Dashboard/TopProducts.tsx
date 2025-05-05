import { TfiCrown } from "react-icons/tfi";
import { ITopProduct } from "../../types/sales";
import * as S from "./styles";

interface ITopProductsProps {
  title: string;
  todaysTopProducts: ITopProduct[];
}

const RANKCOLOR = ["#c99f00", "#959595", "#ab6f4d"];

export const TopProducts = ({
  title,
  todaysTopProducts,
}: ITopProductsProps) => {
  return (
    <S.TopProductsContainer>
      <div>
        <S.RankingTitle>{title}</S.RankingTitle>
        <S.RankingList>
          {todaysTopProducts.map((product) => (
            <S.RankingItem key={`today-${product.rank}`}>
              <RankIcon
                rank={product.rank}
                color={RANKCOLOR[product.rank - 1]}
              />
              <S.ProductName>{product.name}</S.ProductName>
              <S.ProductAmount>
                {product.amount.toLocaleString()}円
              </S.ProductAmount>
            </S.RankingItem>
          ))}
        </S.RankingList>
      </div>
    </S.TopProductsContainer>
  );
};

interface IRankIconProps {
  rank: number;
  color: string;
}
const RankIcon = ({ rank, color }: IRankIconProps) => {
  return (
    <S.RankIconContainer>
      <TfiCrown style={{ ...S.TfiCrownProps, color: color }} />
      <S.RankNumber>{rank}</S.RankNumber>
    </S.RankIconContainer>
  );
};

export default TopProducts;
