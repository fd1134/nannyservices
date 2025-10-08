import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [], 
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const nannyId = action.payload;
      if (state.favorites.includes(nannyId)) {
        state.favorites = state.favorites.filter(id => id !== nannyId);
      } else {
        state.favorites.push(nannyId);
      }
    },
  },
});

export const { toggleFavorite } = favouritesSlice.actions; 
export default favouritesSlice.reducer;