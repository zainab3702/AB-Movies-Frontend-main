import { createSlice } from "@reduxjs/toolkit";

const trendingSlice = createSlice({
  name: "trending",
  initialState: [],
  reducers: {
    setTrending: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTrending } = trendingSlice.actions;
export default trendingSlice.reducer;
