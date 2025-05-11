import { useCallback } from "react";
import { fetchSuggestions } from "../api/fetchSuggestions";
import { fetchRecipeDetail } from "../api/fetchRecipeDetail";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSelected,
  setConstraints,
  setCustomInputs,
  setIsLoading,
  setRecipeDetail,
  setRecipeErrorMessage,
  setRecipeModalState,
  setSuggestions,
} from "../store/recipeSlice";
import { RootState } from "../store";

export const useRecipe = () => {
  const dispatch = useDispatch();
  const {
    ingredients,
    suggestions,
    recipeDetail,
    recipeModalState,
    recipeErrorMessage,
    isLoading,
  } = useSelector((state: RootState) => state.recipe);

  const splitByDelimiters = useCallback((target: string) => {
    const DELIMITERS = [",", "、"];

    const regexp = new RegExp(DELIMITERS.join("|"));
    return target
      .split(regexp)
      .filter((x) => x.trim() != "")
      .map((y) => y.trim());
  }, []);

  const handleError = useCallback(
    (e: unknown) => {
      dispatch(setRecipeModalState("error"));
      dispatch(setIsLoading(false));

      if (e instanceof Error) {
        dispatch(setRecipeErrorMessage(e.message));
      } else {
        const errorMessage =
          typeof e === "string" ? e : "不明なエラーが発生しました";
        dispatch(setRecipeErrorMessage(errorMessage));
      }
      window.scrollTo(0, 0);
    },
    [dispatch]
  );

  const handleRequestRecipe = useCallback(async () => {
    try {
      dispatch(setIsLoading(true));
      const selectedIngredients = ingredients.ingredientGroups.flatMap(
        ({ items }) =>
          items.filter((item) => item.selected).map(({ name }) => name)
      );
      const constraints = ingredients.constraints;
      const suggestions = await fetchSuggestions({
        ingredients: [
          ...new Set([
            ...selectedIngredients,
            ...splitByDelimiters(ingredients.customInputs),
          ]),
        ],
        ...(constraints && { constraints: constraints }),
      });

      dispatch(setSuggestions(suggestions.candidates));
      dispatch(setRecipeModalState("suggestions"));
      dispatch(setIsLoading(false));
    } catch (e: unknown) {
      handleError(e);
    }
  }, [dispatch, handleError, ingredients, splitByDelimiters]);

  const handleRequestRecipeDetail = useCallback(
    async (recipeName: string) => {
      try {
        dispatch(setIsLoading(true));
        const recipeDetail = await fetchRecipeDetail({
          recipeName: recipeName,
        });
        dispatch(setRecipeDetail(recipeDetail));
        dispatch(setRecipeModalState("detail"));
        dispatch(setIsLoading(false));
      } catch (e: unknown) {
        handleError(e);
      }
    },
    [dispatch, handleError]
  );

  const handleCloseModal = () => {
    dispatch(setRecipeModalState("none"));
    setIsLoading(false);
  };

  const handleBackToSuggestions = () => {
    dispatch(setRecipeModalState("suggestions"));
  };

  const hasSelectedItem = useCallback((): boolean => {
    return ingredients.ingredientGroups.some((ingredient) =>
      ingredient.items.some(({ selected }) => selected)
    );
  }, [ingredients]);

  return {
    ingredientGroups: ingredients.ingredientGroups,
    customInputs: ingredients.customInputs,
    constraints: ingredients.constraints,
    isLoading,

    suggestions,
    recipeDetail,
    recipeModalState,
    recipeErrorMessage,

    changeSelected: (name: string) => dispatch(changeSelected(name)),
    setCustomInputs: (input: string) => dispatch(setCustomInputs(input)),
    setConstraints: (input: string) => dispatch(setConstraints(input)),

    handleRequestRecipe,
    handleRequestRecipeDetail,
    handleCloseModal,
    handleBackToSuggestions,
    hasSelectedItem,
  };
};
