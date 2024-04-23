import { createSlice } from "@reduxjs/toolkit";

export const MovieSlice = createSlice({
  name: "movies",
  initialState: [],
  reducers: {
    setMovies: (state, action) => {
      return action.payload;
    },
  },
});

export const { setMovies } = MovieSlice.actions;

export default MovieSlice.reducer;
