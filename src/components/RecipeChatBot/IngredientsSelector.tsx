import * as S from "./Style";
import { useRecipe } from "../../hooks/useRecipe";
import Checkbox from "../common/Checkbox";
import { Input } from "../common/Input.style";
import { Button } from "../common/Button.style";
import InfoCard from "../common/InfoCard";

const IngredientsSelector = () => {
  const {
    ingredientGroups,
    customInputs,
    constraints,
    changeSelected,
    setCustomInputs,
    setConstraints,
    handleRequestRecipe,
    isLoading,
    hasSelectedItem,
  } = useRecipe();

  return (
    <S.IngredientsContainer>
      <div>
        <S.Caption>
          使用する材料を選択してください（複数選択可）
          <br />
          選択した材料に基づいて、AIが作れる料理を自動で提案します。
        </S.Caption>
        {ingredientGroups.map(({ category, items }) => (
          <S.IngredientsWrapper key={category}>
            <S.Title>
              <S.TitleIcon />
              {category}
            </S.Title>
            <div>
              <S.List>
                {items.map(({ name, selected }) => (
                  <S.ListItem key={`${category}-${name}`}>
                    <Checkbox
                      checked={selected}
                      onChange={() => changeSelected(name)}
                      label={name}
                    />
                  </S.ListItem>
                ))}
              </S.List>
            </div>
          </S.IngredientsWrapper>
        ))}
        <S.IngredientsWrapper>
          <S.Title>
            <S.TitleIcon />
            自由入力材料
          </S.Title>
          <Input
            type="text"
            placeholder="例: 豆腐、ラム肉"
            value={customInputs}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCustomInputs(e.target.value)
            }
          />
          <S.Title>
            <S.TitleIcon />
            考慮してほしいこと（任意）
          </S.Title>
          <Input
            type="text"
            placeholder="例: 温かいものがいいです"
            value={constraints}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setConstraints(e.target.value)
            }
          />
        </S.IngredientsWrapper>
        <Button
          onClick={handleRequestRecipe}
          disabled={isLoading || (!hasSelectedItem() && !customInputs.trim())}
        >
          {isLoading ? "検索中" : "料理を提案"}
        </Button>
      </div>
      <S.InfoCardWrapper>
        <InfoCard
          title="バックエンドで使用したサービス"
          messages={[
            "OpenAI API：生成AIモデルをAPI経由で利用できるサービス",
            "Node.js：サーバー側のランタイム環境",
            "AWS SAM：サーバーレスアプリケーションの構築・デプロイを簡素化するフレームワーク",
            "AWS Lambda：サーバー管理不要でコードを実行できるサービス",
            "Amazon API Gateway：	REST API の公開、Lambda との接続、CORS処理などを担う中継サービス",
            "AWS Systems Manager Parameter Store：機密情報の管理（AWS KMSを利用した暗号化にも対応）",
          ]}
        />
      </S.InfoCardWrapper>
    </S.IngredientsContainer>
  );
};

export default IngredientsSelector;
