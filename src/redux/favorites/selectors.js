export const selectFavoritesRecipes = (state) => state.favorites.items;
export const selectFavoritesLoading = (state) => state.favorites.loading;
export const selectFavoritesError = (state) => state.favorites.error;
export const selectFavoritesHasMore = (state) => state.favorites.hasMore;
export const selectFavoritesPage = (state) => state.favorites.page;
export const selectFavoritesPerPage = (state) => state.favorites.perPage;
