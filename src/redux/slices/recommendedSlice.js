import { createSlice } from "@reduxjs/toolkit";

// this is the state to make an api call to get the recomended movies and tv shows
export const recommendedSlice = createSlice({
  name: "recommended",
  initialState: {
    type: "movies" || "tvShows",
    data: [],
  },
  reducers: {
    setRecommended: (state, action) => {
      // returning the array of movies to be displayed on the home screen
      return action.payload;
    },
  },
});

export const { setRecommended } = recommendedSlice.actions;
export default recommendedSlice.reducer;
