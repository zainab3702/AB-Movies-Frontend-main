/* eslint-disable react/prop-types */
import { FaFilm } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GrDevice } from "react-icons/gr";
import BookmarkComponent from "../BookmarkComponent";
import { useNavigate } from "react-router-dom";

const TrendingCard = ({ item }) => {
  const navigate = useNavigate();

  // to  get the type of the item for navigation to details page
  const type = item.type === "Movie" ? "movies" : "tvshows";

  // Function to get the release year of the movie or tv show
  const getReleaseYear = (item) => {
    return item.type === "Movie"
      ? (item.releaseDate && item.releaseDate.split("-")[0]) || "N/A"
      : (item.firstAirDate && item.firstAirDate.split("-")[0]) || "N/A";
  };
  return (
    <div key={item.title} className=" relative z-10 snap-start">
      <div className="relative w-48 md:w-80">
        <img
          src={item.bannerUrl || item.posterUrl}
          onError={(e) => {
            e.target.src = "/placeHolder.png";
          }}
          alt={item.title}
          className="aspect-video w-full  cursor-pointer rounded-lg object-fill transition-opacity duration-300 hover:opacity-50"
          onClick={() => {
            navigate(`/${type}/${item._id}`);
          }}
        />
        <BookmarkComponent id={item._id} />
      </div>
      <div className="flex w-full items-center gap-4 text-app-icons">
        <span>{getReleaseYear(item)}</span>
        <GoDotFill className="h-3 w-3" />
        {item.type === "Movie" ? (
          <FaFilm className="inline-block h-4 w-4" />
        ) : (
          <GrDevice className="inline-block h-4 w-4" />
        )}
      </div>
      <h3>{item.title}</h3>
    </div>
  );
};

export default TrendingCard;
