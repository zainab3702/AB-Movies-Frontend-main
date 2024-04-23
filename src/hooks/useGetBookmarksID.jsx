import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { populateBookmarkIDs } from "../redux/slices/bookmarksSlice";
import axios from "../api/axios";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// custom hook to get the bookmarks id's from the backend
const useGetBookmarksID = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const getBookmarksID = async () => {
      try {
        const response = await axios.get("/user/watchlist", {
          headers: { Authorization: `Bearer ${auth.accessToken}` }
        });
        const data = response.data;
        if (data.success) {
          data.watchlist.forEach((item) => {
            // adding id's to the bookmarksId array in redux store
            dispatch(populateBookmarkIDs(item._id));
          });
        }
      } catch (err) {
        navigate("/login", { state: { from: pathname }, replace: true });
      }
    };
    getBookmarksID();
  }, []);
};

export default useGetBookmarksID;
