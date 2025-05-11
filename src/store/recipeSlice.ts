import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IIngredientGroup,
  IRecipeDetail,
  IRecipeState,
  IRecipeModalState,
} from "../types/recipe";
import ingredients from "../data/ingredients.json";

const ingredientMap = ingredients as Record<string, string[]>;
const initialIngredients: IIngredientGroup[] = Object.entries(
  ingredientMap
).map(([category, items]) => ({
  category: category,
  items: items.map((item) => ({ name: item, selected: false })),
}));

const initialState: IRecipeState = {
  ingredients: {
    ingredientGroups: initialIngredients,
    customInputs: "",
    constraints: "",
  },
  suggestions: [],
  recipeDetail: null,
  recipeModalState: "none",
  recipeErrorMessage: "",
  isLoading: false,
};

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    changeSelected: (state, action: PayloadAction<string>) => {
      const changeItemName = action.payload;
      for (const group of state.ingredients.ingredientGroups) {
        const targetItem = group.items.find(
          (item) => item.name === changeItemName
        );
        if (targetItem) {
          targetItem.selected = !targetItem.selected;
          break;
        }
      }
    },

    setCustomInputs: (state, action: PayloadAction<string>) => {
      state.ingredients.customInputs = action.payload;
    },

    setConstraints: (state, action: PayloadAction<string>) => {
      state.ingredients.constraints = action.payload;
    },

    resetIngredients: (state) => {
      state.ingredients = initialState.ingredients;
    },

    setSuggestions: (state, action: PayloadAction<string[]>) => {
      state.suggestions = action.payload;
    },

    setRecipeDetail: (state, action: PayloadAction<IRecipeDetail>) => {
      state.recipeDetail = action.payload;
    },

    setRecipeModalState: (state, action: PayloadAction<IRecipeModalState>) => {
      state.recipeModalState = action.payload;
    },

    setRecipeErrorMessage: (state, action: PayloadAction<string>) => {
      state.recipeErrorMessage = action.payload;
    },

    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  changeSelected,
  setCustomInputs,
  setConstraints,
  resetIngredients,
  setSuggestions,
  setRecipeDetail,
  setRecipeModalState,
  setRecipeErrorMessage,
  setIsLoading,
} = recipeSlice.actions;
export default recipeSlice.reducer;
