import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: { bookmarkId: [], bookmarkArray: [] },
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarkId.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarkId = state.bookmarkId.filter(
        (mediaId) => mediaId !== action.payload
      );
    },

    populateBookmarkArray: (state, action) => {
      state.bookmarkArray = action.payload;
    },
    populateBookmarkIDs: (state, action) => {
      state.bookmarkId = [...state.bookmarkId, action.payload];
    }
  }
});

export const {
  addBookmark,
  removeBookmark,
  populateBookmarkArray,
  populateBookmarkIDs
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
