import * as S from "./Style";
import { useRecipe } from "../../hooks/useRecipe";

const RecipeSuggestions = () => {
  const {
    suggestions,
    handleRequestRecipeDetail,
    handleCloseModal,
    isLoading,
  } = useRecipe();

  return (
    <S.ModalOverlay>
      <S.Modal role="dialog" aria-labelledby="suggestions-title">
        <S.CloseButton onClick={handleCloseModal} aria-label="閉じる">
          ×
        </S.CloseButton>
        <S.ModalTitle id="suggestions-title">料理候補</S.ModalTitle>
        {suggestions.length <= 0 ? (
          <p>料理が見つかりませんでした</p>
        ) : (
          <S.RecipeList>
            {isLoading && <S.SearchingText>検索中</S.SearchingText>}
            {suggestions?.map((name) => (
              <S.RecipeButton
                key={name}
                onClick={() => handleRequestRecipeDetail(name)}
                disabled={isLoading}
              >
                {name}
              </S.RecipeButton>
            ))}
          </S.RecipeList>
        )}
      </S.Modal>
    </S.ModalOverlay>
  );
};

export default RecipeSuggestions;
