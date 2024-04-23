/* eslint-disable react/prop-types */
import { FaFilm } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { GrDevice } from "react-icons/gr";
import BookmarkComponent from "./BookmarkComponent";
import { useNavigate } from "react-router-dom";

const MediaComponent = ({ error, data }) => {
  const navigate = useNavigate();

  // Function to get the release year of the movie or tv show
  const getReleaseYear = (item) => {
    return item.type === "Movie"
      ? (item.releaseDate && item.releaseDate.split("-")[0]) || "N/A"
      : (item.firstAirDate && item.firstAirDate.split("-")[0]) || "N/A";
  };
  return (
    <>
      {error ? (
        <h2 className="text-2xl font-light sm:text-4xl">{error}</h2>
      ) : (
        <div className="grid grid-cols-1 gap-8 place-self-center sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {data.map((item) => (
            <div className="w-64 md:w-72 lg:w-64 xl:w-64 " key={item._id}>
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
                    navigate(
                      `/${item.type === "Movie" ? "movies" : "tvshows"}/${item._id}`
                    );
                  }}
                />
                <BookmarkComponent id={item._id} />
              </div>
              <div>
                <div className="flex w-full items-center gap-4 text-app-icons">
                  <span>{getReleaseYear(item)}</span>
                  <GoDotFill className="h-3 w-3" />
                  {item.type === "Movie" ? (
                    <FaFilm className="inline-block h-4 w-4" />
                  ) : (
                    <GrDevice className="inline-block h-4 w-4" />
                  )}
                </div>
              </div>
              <h2>{item.title}</h2>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MediaComponent;
