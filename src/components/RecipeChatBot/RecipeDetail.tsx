import * as S from "./Style";
import { useRecipe } from "../../hooks/useRecipe";
import { Button } from "../common/Button.style";

const RecipeDetail = () => {
  const { recipeDetail, handleBackToSuggestions, handleCloseModal } =
    useRecipe();

  return (
    <S.ModalOverlay>
      <S.Modal role="dialog" aria-labelledby="recipe-detail-title">
        <S.CloseButton onClick={handleCloseModal} aria-label="閉じる">
          ×
        </S.CloseButton>
        {recipeDetail === null ? (
          <>レシピが見つかりません。</>
        ) : (
          <S.RecipeDetail>
            <S.ModalTitle id="recipe-detail-title">
              {recipeDetail.title}
            </S.ModalTitle>
            <h3>材料</h3>
            <ul>
              {recipeDetail.ingredients.map(
                (ingredient: string, idx: number) => (
                  <li key={idx}>{ingredient}</li>
                )
              )}
            </ul>
            <h3>作り方</h3>
            <ol>
              {recipeDetail.steps.map((step: string, idx: number) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
            <Button onClick={handleBackToSuggestions}>候補に戻る</Button>
          </S.RecipeDetail>
        )}
      </S.Modal>
    </S.ModalOverlay>
  );
};

export default RecipeDetail;
