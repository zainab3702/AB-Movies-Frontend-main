import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axios";
import { useAuth } from "./useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { populateBookmarkArray } from "../redux/slices/bookmarksSlice";

// custom hook to get the bookmarks from the backend
const useGetBookmarks = () => {
  // getting the bookmarksId array from the redux store
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkId);
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // handler function to hit the backend and get the bookmarks
    const getBookmarks = async () => {
      try {
        const response = await axios.get("/user/watchlist", {
          headers: { Authorization: `Bearer ${auth.accessToken}` }
        });
        const data = response.data;
        if (data.success) {
          // dispatching the bookmarks array to the redux store
          dispatch(populateBookmarkArray(data.watchlist));
        }
      } catch (err) {
        navigate("/login", { state: { from: pathname }, replace: true });
      }
    };
    // using the handler function
    getBookmarks();
  }, [bookmarks]);
};

export default useGetBookmarks;
