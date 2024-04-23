/* eslint-disable react/prop-types */
import { FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaRegBookmark } from "react-icons/fa";
import useToggleBookmark from "../hooks/useToggleBookmark";

const BookmarkComponent = ({ id }) => {
  const toggleBookmarkId = useToggleBookmark();
  const bookmarks = useSelector((state) => state.bookmarks.bookmarkId);
  const doesIdExist = bookmarks.includes(id);

  return (
    <>
      <div
        className="z-40/home/deep1910/Desktop/projects/Flix/Flix-backend/.env group absolute right-2 top-2 grid size-10 cursor-pointer place-items-center rounded-full bg-app-dark bg-opacity-60 transition-colors duration-300 ease-in hover:bg-white hover:bg-opacity-100"
        onClick={() => {
          toggleBookmarkId(id, doesIdExist);
        }}
      >
        {doesIdExist ? (
          <FaBookmark className="size-4 group-hover:fill-black" />
        ) : (
          <FaRegBookmark className="size-4 group-hover:fill-black" />
        )}
      </div>
    </>
  );
};

export default BookmarkComponent;
