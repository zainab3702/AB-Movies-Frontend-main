/* eslint-disable react/prop-types */

import { FaFilm } from "react-icons/fa";
import { GrDevice } from "react-icons/gr";
import { GoDotFill } from "react-icons/go";
import BookmarkComponent from "../BookmarkComponent";
import { useNavigate } from "react-router-dom";

const RecommendedCard = ({ data, type }) => {
  // Function to get the release year of the movie or tv show
  const getReleaseYear = (item) => {
    return type === "movies"
      ? (item.releaseDate && item.releaseDate.split("-")[0]) || "N/A"
      : (item.firstAirDate && item.firstAirDate.split("-")[0]) || "N/A";
  };

  return (
    <>
      {data.map((item) => (
        <RecommendedItem
          key={item._id}
          item={item}
          type={type}
          getReleaseYear={getReleaseYear}
        />
      ))}
    </>
  );
};

const RecommendedItem = ({ item, type, getReleaseYear }) => {
  const navigate = useNavigate();
  const releaseYear = getReleaseYear(item);

  return (
    <div className="w-64 md:w-[13.5rem] lg:w-64">
      <div className="relative w-full rounded-lg">
        <img
          src={item.bannerUrl || item.posterUrl}
          onError={(e) => {
            e.target.src = "/placeHolder.png";
          }}
          alt={item.title}
          loading="eager"
          className="aspect-video w-full cursor-pointer rounded-lg object-fill transition-opacity duration-300 hover:opacity-50"
          onClick={() => {
            navigate(`/${type.toLowerCase()}/${item._id}`);
          }}
        />
        <BookmarkComponent id={item._id} />
      </div>
      <div>
        <div className="flex w-full items-center gap-4 text-app-icons">
          <span>{releaseYear}</span>
          <GoDotFill className="h-3 w-3" />
          {type === "movies" ? (
            <FaFilm className="inline-block h-4 w-4" />
          ) : (
            <GrDevice className="inline-block h-4 w-4" />
          )}
        </div>
      </div>
      <h2 className="tracking-wide">
        {item.title.length > 30 ? item.title.slice(0, 30) + "..." : item.title}
      </h2>
    </div>
  );
};

export default RecommendedCard;
