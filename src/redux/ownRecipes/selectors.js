export const selectOwnRecipes = (state) => state.ownRecipes.items;
export const selectOwnRecipesLoading = (state) => state.ownRecipes.isLoading;
export const selectOwnRecipesError = (state) => state.ownRecipes.error;
export const selectOwnRecipesHasMore = (state) => state.ownRecipes.hasMore;
export const selectOwnRecipesPage = (state) => state.ownRecipes.page;
export const selectOwnRecipesPerPage = (state) => state.ownRecipes.perPage;
