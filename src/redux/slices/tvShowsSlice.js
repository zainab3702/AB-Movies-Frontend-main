import { createSlice } from "@reduxjs/toolkit";

export const TvShowSlice = createSlice({
  name: "tvShows",
  initialState: [],
  reducers: {
    setTvShows: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTvShows } = TvShowSlice.actions;

export default TvShowSlice.reducer;
