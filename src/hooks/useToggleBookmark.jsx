import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import { addBookmark, removeBookmark } from "../redux/slices/bookmarksSlice";
import axios from "../api/axios";
const useToggleBookmark = () => {
  const { auth } = useAuth();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const toggleBookmarkId = async (id, isBookmarked) => {
    if (!isBookmarked) {
      try {
        const response = await axios.post(
          `/user/watchlist/${id}`,
          {},
          {
            headers: { Authorization: `Bearer ${auth.accessToken}` }
          }
        );

        const data = response.data;
        if (data.success) {
          dispatch(addBookmark(id));
        }
      } catch (err) {
        if (err.response.status === 500) {
          toast.error(err.response.data.message);
        } else if (err.response.status === 401) {
          navigate("/login", { state: { from: pathname }, replace: true });
        }
      }
    } else {
      try {
        const response = await axios.delete(`/user/watchlist/${id}`, {
          headers: { Authorization: `Bearer ${auth.accessToken}` }
        });

        const data = response.data;
        if (data.success) {
          dispatch(removeBookmark(id));
        }
      } catch (err) {
        if (err.response.status === 500) {
          toast.error(err.response.data.message);
        } else if (err.response.status === 401) {
          navigate("/login", { state: { from: pathname }, replace: true });
        }
      }
    }
  };

  return toggleBookmarkId;
};

export default useToggleBookmark;
