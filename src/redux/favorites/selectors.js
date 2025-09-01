export const selectFavoritesRecipes = (state) => state.favorites.items;
export const selectFavoritesLoading = (state) => state.favorites.isLoading;
export const selectFavoritesError = (state) => state.favorites.error;
export const selectFavoritesHasMore = (state) => state.favorites.hasMore;
export const selectFavoritesPage = (state) => state.favorites.page;
export const selectFavoritesPerPage = (state) => state.favorites.perPage;
export const selectFavoritesTotalRecipes = (state) => state.favorites.total;
export const selectFavoriteIds = (state) => state.favorites.items;

export const selectIsFavorite = (recipeId) => (state) => {
  const favoriteIds = state.favorites.items;
  return favoriteIds.includes(recipeId.toString());
};
