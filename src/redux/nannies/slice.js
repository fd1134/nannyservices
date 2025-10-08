import { createSlice } from "@reduxjs/toolkit";
import { fetchNannies } from "./operations";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  filter: "Show all",
  lastVisible: null,
  hasMore: true,
};

const nanniesSlice = createSlice({
  name: "nannies",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
      state.items = [];
      state.lastVisible = null;
      state.hasMore = true;
    },
    resetNannies(state) {
      state.items = [];
      state.lastVisible = null;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNannies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNannies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = [...state.items, ...action.payload.data];
        state.lastVisible = action.payload.lastVisible;
        if (action.payload.data.length < 3) {
          state.hasMore = false;
        }
      })
      .addCase(fetchNannies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setFilter, resetNannies } = nanniesSlice.actions;
export const nanniesReducer = nanniesSlice.reducer;
