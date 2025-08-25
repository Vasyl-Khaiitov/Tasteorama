export const SelectRecipes = (state) => state.recipes.items;
export const SelectRecipesIsLoading = (state) => state.recipes.isLoading;
export const SelectRecipesHasMore = (state) => state.recipes.hasMore;
export const SelectRecipesPage = (state) => state.recipes.page;
export const SelectRecipesPerPage = (state) => state.recipes.perPage;
export const SelectTotalRecepies = (state) => state.recipes.items.length;
export const selectCurrentRecipe = (state) => state.recipes.currentRecipe;
export const selectRecipesIsLoadingCurrentRecipe = ({ recipes }) =>
  recipes.isLoadingCurrentRecipe;
export const selectRecipesError = ({ recipes }) => recipes.error;
