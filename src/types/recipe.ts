export interface IIngredientItem {
  name: string;
  selected: boolean;
}

export interface IIngredientGroup {
  category: string;
  items: IIngredientItem[];
}

export interface IIngredientInput {
  ingredientGroups: IIngredientGroup[];
  customInputs: string;
  constraints: string;
}

export interface IRecipeDetail {
  title: string;
  ingredients: string[];
  steps: string[];
}

export interface IRecipeState {
  ingredients: IIngredientInput;
  suggestions: string[];
  recipeDetail: IRecipeDetail | null;
  recipeModalState: IRecipeModalState;
  recipeErrorMessage: string;
  isLoading: boolean;
}

export type IRecipeModalState = "none" | "suggestions" | "detail" | "error";
