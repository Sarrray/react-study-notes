import { useRecipe } from "../../hooks/useRecipe";
import useScrollLock from "../../hooks/useScrollLock";
import { IRecipeModalState } from "../../types/recipe";
import IngredientsSelector from "./IngredientsSelector";
import RecipeDetail from "./RecipeDetail";
import RecipeSuggestions from "./RecipeSuggestions";
import * as S from "./Style";

const RecipeChatBot = () => {
  const { recipeModalState, recipeErrorMessage } = useRecipe();

  const isScrollLocklStates: IRecipeModalState[] = ["suggestions", "detail"];
  useScrollLock(isScrollLocklStates.includes(recipeModalState));

  return (
    <div>
      {recipeModalState === "error" && (
        <S.ErrorMessage>{recipeErrorMessage}</S.ErrorMessage>
      )}
      <IngredientsSelector />
      {recipeModalState === "suggestions" && <RecipeSuggestions />}
      {recipeModalState === "detail" && <RecipeDetail />}
    </div>
  );
};

export default RecipeChatBot;
