import { configureStore } from "@reduxjs/toolkit";
import recommendedSlice from "../slices/recommendedSlice";
import trendingSlice from "../slices/trendingSlice";
import TvShowSlice from "../slices/tvShowsSlice";
import MovieSlice from "../slices/moviesSlice";
import bookmarksSlice from "../slices/bookmarksSlice";
const store = configureStore({
  reducer: {
    recommended: recommendedSlice,
    trending: trendingSlice,
    movies: MovieSlice,
    tvShows: TvShowSlice,
    bookmarks: bookmarksSlice
  }
});

export default store;
