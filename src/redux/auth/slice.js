import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./operations";

const initialState = {
  currentUser: null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
};
const setPending = (state) => {
  state.status = "loading";
  state.error = null;
};

const setFulfilled = (state, action) => {
  state.status = "succeeded";
  state.currentUser = action.payload;
};

const setRejected = (state, action) => {
  state.status = "failed";
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register
    builder
      .addCase(registerUser.pending, setPending)
  .addCase(registerUser.fulfilled, setFulfilled)
  .addCase(registerUser.rejected, setRejected)
  .addCase(loginUser.pending, setPending)
  .addCase(loginUser.fulfilled, setFulfilled)
  .addCase(loginUser.rejected, setRejected)
  .addCase(logoutUser.pending, setPending)
  .addCase(logoutUser.fulfilled, (state) => {
    state.status = "succeeded";
    state.currentUser = null;
  })
  .addCase(logoutUser.rejected, setRejected);
  },
});

export default authSlice.reducer;
