export interface IRecipeSuggestionsRequest {
  ingredients: string[];
  constraints?: string;
}

export interface IRecipeSuggestionsResponse {
  candidates: string[];
}

export interface IfetchRecipeDetailRequest {
  recipeName: string;
}

export interface IfetchRecipeDetailResponse {
  title: string;
  ingredients: string[];
  steps: string[];
}
