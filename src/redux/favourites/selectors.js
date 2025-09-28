export const selectFavourites = (state) => state.favourites.items;
export const isFavourite = (id) => (state) => state.favourites.items.includes(id);